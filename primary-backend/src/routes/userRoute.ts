import { Router } from "express"
import { authMiddleware } from "../middleware";
import { SignInSchema, SignUpSchema } from "../types";
import { prismaClient } from "../db";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const router = Router();

router.post("/signup", async (req,res)=>{
    const {username , name , password}  = req.body;
    const parsedData = SignUpSchema.safeParse({username , name , password})

    if(!parsedData.success){
      return res.status(411).json({
        message: "Incorrect Inputs"
      })
    }
    
    try {
      const userExists = await prismaClient.user.findFirst({
        where: {
          email: parsedData.data?.username
        }
      })
  
  
      if(userExists){
        return res.status(403).json({
          message: "You are already signed uup"
        })
      }
      const hash = await bcrypt.hash(parsedData.data.password, 10)
      await prismaClient.user.create({
        data: {
             email: parsedData.data.username,
             name: parsedData.data.name,
             password: hash
        }
      })

      //await sendEmail();

      return res.status(200).json({
        message: "Please verify your account by checking you email"
      })
    } catch (error) {
      res.status(500).json({
        message: "Internal server error"
      })
    }
})


router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  
  // Validate input
  const parsedData = SignInSchema.safeParse({ username, password });
  if (!parsedData.success) {
    return res.status(400).json({ message: "Incorrect inputs" });
  }

  try {
    // Check if user exists
    const user = await prismaClient.user.findFirst({
      where: { email: parsedData.data.username }
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(parsedData.data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success response
    return res.status(200).json({ message: "Sign in successful" });

  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    return res.status(500).json({ message: "Internal server error" });
  }
});




router.get("/user", authMiddleware, (req,res)=>{
  console.log("user")  
  res.send("hello")
})



export const userRouter = router;