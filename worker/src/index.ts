import { PrismaClient } from '@prisma/client'
import { Kafka } from 'kafkajs'

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
   await consumer.connect()
   await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true})
   await consumer.run({
        autoCommit: false,
        eachMessage : async ({topic, partition, message})=>{
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })
           
          const parsedData = JSON.parse(message.value?.toString());
          const zapRunId = parsedData.zapRunId;
          const stage = parsedData.stage;
        
          const zapRunDetains = await prismaClient.zapRun.findFirst({
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

          const currentAction = zapRunDetains?.zap.actions.find(x=> x.sortingOrder === parseInt(stage))

          if(!currentAction){
             console.log("currentAction no found")
             return;
          }

          if(currentAction.type.id === 'email'){
             console.log("Send out an email")
          }

          if(currentAction.type.id === 'sol'){
             console.log("send out sol")
          }


          await new Promise((r)=>setTimeout(r,9000))

          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString()
          }])
        }
   })
}


main()



