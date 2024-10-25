import nodemailer from "nodemailer";
require('dotenv').config();


const transport = nodemailer.createTransport({
      service: "gmail",
      host:"smtp.google.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }
})



export async function sendEmail(to:string,body:string) {

  await transport.sendMail({
    from: {
      name: "Guru",
      address: process.env.SMTP_USER || ""
    },
    to,
    subject: "Hello form Zapier",
    text: body,
  })
  
}