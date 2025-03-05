import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook", 
    method: "POST", 
    handler: httpAction(async (ctx, request) => {
        // Checking environment variables 
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; 
        if (!webhookSecret) {
            console.log("Error: Missing CLERK_WEBHOOK_SECRET environment variable");
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        // Checking headers 
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");   

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Missing headers", { status: 400 });
        }

        // Parsing the body
        const payload = await request.json(); 
        const body = JSON.stringify(payload); 

        const wh = new Webhook(webhookSecret); 
        let evt:any; 

        // Verifying the webhook
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as any; 
        } catch (err) {
            console.error("❌ Webhook verification failed:", err);
            return new Response("Error Occured", { status: 400 });
        }

        const eventType = evt.type;
        console.log("🔹 Received webhook event:", eventType);
 
        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;
            
            const email = email_addresses[0].email_address;
            // const username = email.split("@")[0];
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.createUser, {
                    email, 
                    username: email.split("@")[0], 
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                });
                console.log("✅ User created successfully:", name);
            } catch (error) {
                console.error("❌ Error creating user:", error);
                return new Response("Error creating user", { status: 500 });
            }
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
});

export default http;