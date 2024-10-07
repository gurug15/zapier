import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();


async function main(){
   
    await prismaClient.avalableTriggers.create({
        data: {
            id: "webhook",
            name: "webhook",
            image: "https://flespi.com/storage/news/643e695e865f7/643e7305a97f0.png"
        }
    })
     
    await prismaClient.avalableActions.createMany({
        data: [{
            id:"email",
            name: "Email",
            image: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
        },{
            id: "sol",
            name: "solana",
            image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
        }]
    })

}

main()