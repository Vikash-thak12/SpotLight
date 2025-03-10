import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/feed.styles'
import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import CommentsModal from './CommentsModal'
import { formatDistanceToNow } from 'date-fns'


type Postpros = {
    post: {
        _id: Id<"posts">;
        _creationTime: number;
        caption?: string | undefined;
        imageUrl: string;
        likes: number;
        comments: number;
        isLiked: boolean;
        isBookmarked: boolean;
        author: {
            _id: string,
            username: string,
            image: string,
        }

    }
}

export default function Post({ post }: Postpros) {
    // like portion
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);

    // comments portion 
    const [commentsCount, setCommentsCount] = useState(post.comments);
    const [showComments, setShowComments] = useState(false);

    // boookmarked section 
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)

    const togglelike = useMutation(api.posts.toggleLike)
    const togglebookmark = useMutation(api.bookmarks.toggleBookmark)

    const handleLike = async () => {
        try {
            const newIsLiked = await togglelike({ postId: post._id });
            setIsLiked(newIsLiked);
            setLikeCount((prev) => newIsLiked ? prev + 1 : prev - 1);
        } catch (error) {
            console.log("Error in handlike: ", error)
        }
    }

    // for bookmarks
    const handleBookmark = async () => {
       const newIsBookmarked = await togglebookmark({ postId: post._id})
       setIsBookmarked(newIsBookmarked); 
    }

    return (
        <View className='p-4 rounded-xl' style={{ marginBottom: 20 }}>
            <View className='flex-row gap-4 items-center justify-between'>
                <Link href={"/(tabs)/profile"}>
                    <TouchableOpacity className='flex-row gap-4 items-center justify-between rounded-xl'>
                        <Image
                            source={post.author.image}
                            style={{ width: 30, height: 30, borderRadius: 50 }}
                            className='rounded-xl'
                            contentFit='cover'
                            transition={200}
                            cachePolicy={"memory-disk"}
                        />
                        <Text className='text-white'>{post.author.username}</Text>
                    </TouchableOpacity>
                </Link>

                {/* show a delete button */}
                {/* note will be showon only if the post belongs to the current user  */}
                <TouchableOpacity onPress={() => alert("Delete button pressed")}>
                    <Ionicons name='trash' size={20} color={COLORS.primary} />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => alert("Delete button pressed")}>
                    <Ionicons name='ellipsis-horizontal' size={20} color={COLORS.primary} />
                </TouchableOpacity> */}
            </View>


            {/* Image section */}
            <View className='mt-4 px-10'>
                <Image
                    source={post.imageUrl}
                    // style={{ width: '80%', height: 100 }}
                    style={styles.postImage}
                    className='rounded-3xl'
                    contentFit='cover'
                    transition={200}
                    cachePolicy={"memory-disk"}
                />
            </View>

            {/* Post Action */}
            {/* like, comment and bookmark */}
            <View className='flex-row gap-4 mt-4 items-center justify-between'>
                <View className='flex-row gap-4'>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? COLORS.primary : COLORS.white} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowComments(true)}>
                        <Ionicons name='chatbubble-outline' size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={handleBookmark}>
                        <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View> 


            {/* Post Info */}
            <View>
                <Text className='text-white mt-4'>
                    {likeCount > 0 ? `${likeCount.toLocaleString()} ${likeCount == 1 ? "like" : "likes"}` : "Be the first to like"}
                </Text>
                {
                    post.caption && (
                        <View>
                            <Text className='text-white mt-2'>{post.caption}</Text>
                        </View>
                    )
                }


                {
                    commentsCount > 0 && (
                        <TouchableOpacity onPress={() => setShowComments(true)}>
                            <Text style={{ color: COLORS.grey, marginTop: 4 }}>
                                View all {commentsCount} comments
                            </Text>
                        </TouchableOpacity>
                    )
                }



                <Text style={{ fontSize: 12, color: COLORS.grey }}>
                    {formatDistanceToNow(post._creationTime, { addSuffix: true })}
                </Text>
            </View>

            <CommentsModal
                postId={post._id}
                visible={showComments}
                onClose={() => setShowComments(false)}
                onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
            />
        </View>
    )
}