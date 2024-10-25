require('dotenv').config()

import { PrismaClient } from '@prisma/client'
import { Kafka } from 'kafkajs'
import { parser } from './parse';
import { sendEmail } from './actions/email';

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events"
const kafka = new Kafka({
    clientId: 'outBox-processor',
    brokers: ['localhost:9092']
})

async function main(){
   const consumer =  kafka.consumer({
    groupId: "main-worker"
   })
   const producer = kafka.producer();
   await consumer.connect()
   await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true})
   await producer.connect();
   await consumer.run({
        autoCommit: false,
        eachMessage : async ({topic, partition, message})=>{
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })
           
          const parsedData = JSON.parse(message.value?.toString() as string);
          const zapRunId = parsedData.zapRunId;
          const stage = parsedData.stage;
        
          const zapRunDetails = await prismaClient.zapRun.findFirst({
            where:{
              id: zapRunId
            },
            include:{
              zap: {
                include:{
                  actions: {
                    include: {
                      type: true
                    }
                  }
                }
              }
            }
          })

          const currentAction = zapRunDetails?.zap.actions.find(x=> x.sortingOrder === parseInt(stage))

          if(!currentAction){
             console.log("currentAction no found")
             return;
          }
          const zapRunMetadata = zapRunDetails?.metadata
          if(currentAction.type.id === 'email'){
             const body = parser(JSON.parse(JSON.stringify(currentAction.metadata))?.body as string,"{","}",zapRunMetadata )  ///Ex:- hi {comment.name}
             console.log("data: ",currentAction.metadata, " zapmetadata: ", zapRunMetadata)
             const email = parser(JSON.parse(JSON.stringify(currentAction.metadata))?.toEmail as string,"{" ,"}",zapRunMetadata)//Ex:- {comment.email}\
             console.log(`email is ${email} and body is ${body}`)
             try {
              await sendEmail(email,body)
             } catch (error) {
              console.log(error)
              return;
             }
          }

          if(currentAction.type.id === 'sol'){
            const address = parser(JSON.parse(JSON.stringify(currentAction.metadata))?.to as string,"{","}", zapRunMetadata)
            console.log("data: ",currentAction.metadata, " zapmetadata: ", zapRunMetadata)
            const amount = parser(JSON.parse(JSON.stringify(currentAction.metadata))?.amount as string,"{","}", zapRunMetadata)
             console.log(`the sol amount and address is amount: ${amount}, address: ${address}`)
          }


          await new Promise((r)=>setTimeout(r,1))

          const zapId = message.value?.toString()

          const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;
          
          if(lastStage !== stage){
            await producer.send({
              topic: TOPIC_NAME,
              messages: [{
                value: JSON.stringify({
                   zapRunId,
                   stage: stage + 1
                })
              }]
            })
          }



          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString()
          }])
        }
   })
}


main()



