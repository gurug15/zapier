import { Router } from "express"
import { prismaClient } from "../db";

const router = Router();

router.get("/available", async (req,res)=>{
    const availableActions = await prismaClient.avalableActions.findMany();
    
    res.status(200).json({
        availableActions
    })

})


export const actionRouter = router;