import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const client = new PrismaClient();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId", async (req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body
   
    //store in db a new trigger
    await client.$transaction(async tx =>{
        const run = await tx.zapRun.create({
            data: {
                zapId:zapId,
                metadata: body
            }
        })

        await tx.zapRunOutbox.create({
            data:{
               zapRunId: run.id
            }
        })
    })
     res.json({
        messaage: "dome"
    })
})


app.listen(3000, ()=>{
    console.log("hooks listening on port: 3000")
})