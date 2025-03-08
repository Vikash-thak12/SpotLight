import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
    args: {
        postId: v.id("posts"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        const post = await ctx.db.get(args.postId);
        if(!post) throw new ConvexError("Post not found");


        const commentId = await ctx.db.insert("comments", {
            userId: currentUser._id,
            postId: args.postId,
            content: args.content,
        })

        await ctx.db.patch(args.postId, { comments: post.comments + 1})

        // update Notification table when the comment is done by another user
        if(post.userId != currentUser._id){
            await ctx.db.insert("notifications", {
                receiverId: post.userId, 
                senderId: currentUser._id, 
                type: "comment", 
                postId: args.postId, 
                commentId, 
            })
        }

        return commentId; 
    }
})

// export const getCommnets = mutation({

// })