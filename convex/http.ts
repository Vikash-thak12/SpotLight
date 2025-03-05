import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix"
import { api } from "./_generated/api";

const http = httpRouter()

http.route({
    path: "/clerk-webhook", 
    method: "POST", 
    handler: httpAction(async (ctx, request) => {
        // checking environment variables 
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; 
        if(!webhookSecret){
            throw new Error("Missing CLERK_WEBHOOK_SECRET environmnet variable")
        }

        // checking headers 
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");   

        if(!svix_id || !svix_signature || !svix_timestamp){
            return new Response("Missing headers", {status: 400})
        }

        // parsing the body
        const payload = await request.json(); 
        const body = payload.stringify(); 


        const wh = new Webhook(webhookSecret); 
        let evt:any; 

        // verifying the webhook
        try {
            evt = wh.verify(body,{
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as any; 
        } catch (error) {
            console.log("Error verifying webhook", error);
            return new Response("Invalid webhook", {status: 400})
        }


        const eventType = evt.type; 
        if(eventType === "user.created"){
            const {id, email_addresses, first_name, last_name, image_url} = evt.data; 

            const email = email_addresses[0].email;
            const username = email.split("@")[0];
            const fullname = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.createUser, {
                    email, 
                    username, 
                    fullname,
                    image: image_url,
                    clerkId: id,
                })
            } catch (error) {
                console.log("Error creating user", error);
                return new Response("Error creating user", {status: 500})
            }
        }

        return new Response("Webhook passes Successfully", {status: 200})
    })

})


export default  http; 