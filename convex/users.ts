import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Creating a user 
export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {

        // query to get the existing user 
        const existingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        
        if(existingUser) return; 

        // creating user in the database 
        ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.email,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0
        })
    }
});