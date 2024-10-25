import { NextFunction, Request,Response } from "express"
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "./config";


export const authMiddleware = (req:Request,res: Response,next:NextFunction)=>{
    const token = req.headers.authorization as unknown as string;

    try {
        const payload = jwt.verify(token,JWT_PASSWORD)
        // console.log("payload: ",payload)
        // console.log("req: ", req)
        if(payload){
            // @ts-ignore
            req.id = payload.id
            next()
        }else{
            return res.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            error: "Invalid Token"
        })
    } 


}