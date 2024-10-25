import { Router } from "express"
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req,res)=>{
   const body = req.body;
   const parsedBody = ZapCreateSchema.safeParse(body)
   // @ts-ignore 
   const id = req.id
   if(!parsedBody.success){
    return res.status(411).json({
        message: "Invalid Inputs"
    })
   }
    console.log(JSON.stringify(parsedBody))
    //@ts-ignore
   const zap =  await prismaClient.$transaction(async tx =>{

       const zap =  await prismaClient.zap.create({
        data:{
            userId: id,
            triggerId: "",
            actions: {
                create : parsedBody.data.actions.map((x,idx)=>({
                    actionId: x.availableActionId,
                    sortingOrder: idx,
                    metadata: x.actionMetadata
                }))
            }
        }
       })

       const trigger = await tx.trigger.create({
        data: {
            triggerId: parsedBody.data.availableTriggerId,
            zapId: zap.id
        }
       })
 
       await tx.zap.update({
        where: {
            id: zap.id
        },
        data: {
            triggerId: trigger.id
        }
       })

       return zap.id
    })


    return res.status(200).json({
        message: "zap created",
        zapId: zap
    })
})

router.get("/",authMiddleware , async (req,res)=>{
  // @ts-ignore
    const id =  req.id ;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: parseInt(id)
        },
        include:{
            actions:{
                include: {
                    type: true
                }
            },
            trigger:{
                include: {
                    type: true
                }
            }

        }
    })

    res.json({
        zaps
    })

})

router.get("/:zapId",authMiddleware ,async (req,res)=>{
   // @ts-ignore
   const id =  req.id ;
   const zapId = req.params.zapId;
   const zap = await prismaClient.zap.findFirst({
       where: {
           userId: id,
           id: zapId
       },
       include:{
           actions:{
               include: {
                   type: true
               }
           },
           trigger:{
               include: {
                   type: true
               }
           }

       }
   })

   res.json({
       zap
   })
})





export const zapRouter = router;