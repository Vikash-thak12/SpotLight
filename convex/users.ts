import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
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
        // Query to get the existing user 
        const existingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUser) {
            console.log("🔹 User already exists:", existingUser.username);
            return;
        }

        // Creating user in the database 
        try {
            await ctx.db.insert("users", {
                username: args.username,
                fullname: args.fullname,
                email: args.email,
                bio: args.bio,
                image: args.image,
                clerkId: args.clerkId,
                followers: 0,
                following: 0,
                posts: 0
            });
            console.log("✅ New user inserted:", args.username);
        } catch (error) {
            console.error("❌ Error inserting user into Convex:", error);
        }
    }
});

export const getUserByClerk = query({
    args: {
        clerkId: v.string()
    }, 
    handler: async(ctx, args) => {
        const currentUser = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)).unique(); 
        return currentUser; 
    }
})


export const updateProfile = mutation({
    args: {
        fullname: v.string(), 
        bio: v.optional(v.string()),
    }, 
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx); 
        await ctx.db.patch(currentUser._id, {
            fullname: args.fullname, 
            bio: args.bio
        })
    }
})


export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx){
    const identity = await ctx.auth.getUserIdentity(); 
    if(!identity) throw new Error("Not Authenticated"); 


    const currentUser = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).first(); 
    if(!currentUser) throw new Error("User not found")
    return currentUser;    
}

export const getUserProfile = query({
    args: {
        id: v.id("users")
    }, 
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id); 
        if(!user) throw new Error("No User found")

        return user; 
    }
})

export const isFollowing = query({
    args: {
        followingId: v.id("users"),
    }, 
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx); 

        const follow = await ctx.db
        .query("follows")
        .withIndex("by_both", (q) => q.eq("followerId", currentUser._id).eq("followingId", args.followingId))
        .first()

        return !!follow; 
    }
})