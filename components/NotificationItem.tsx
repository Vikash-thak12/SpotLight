import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Id } from '@/convex/_generated/dataModel';
import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/notification.syles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

// type NotificatioProps = {
//     _id: Id<"notifications">;
//     _creationTime: number;
//     postId?: Id<"posts"> | undefined;
//     type: "like" | "comment" | "follow";
//     sender: {
//         _id: Id<"users">;
//         username: string;
//         image: string;
//     },
//     comment: string,

// }

export default function NotificationItem({ notification }: any) {
    // console.log("Notifications: ", notification)
    return (
        <View style={styles.notificationItem} className='mt-2 p-2'>
            <View style={styles.notificationContent}>
                <Link href={`/(tabs)/notification`} asChild>
                    <TouchableOpacity>
                        <Image
                            source={notification.sender.image}
                            style={styles.avatar}
                            contentFit='cover'
                            transition={200}
                        />
                        <View style={styles.iconBadge}>
                            {
                                (notification.type === "like") ? (
                                    <Ionicons name='heart' size={14} color={COLORS.primary} />
                                ) : (notification.type === 'follow') ? (
                                    <Ionicons name='person-add' size={14} color="#8B5CF6" />
                                ) : (
                                    <Ionicons name='chatbubble' size={14} color="#3B82f6" />
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </Link>
                <View style={styles.notificationInfo}>
                    <Link href={`/(tabs)/notification`}>
                        <TouchableOpacity>
                            <Text style={styles.username}>{notification.sender.username}</Text>
                        </TouchableOpacity>
                    </Link>

                    <Text style={styles.action}>
                        {
                            (notification.type === "comment") ? (
                                `Commented: ${notification.comment}`
                            ) : (notification.type === "like") ? (
                                "Liked your post"
                            ) : (
                                "Started Following you"
                            )
                        }
                    </Text>
                    <Text style={styles.timeAgo}>
                        {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
                    </Text>
                </View>
            </View>
            {
                notification.post && (
                    <Image
                        source={notification.post.imageUrl}
                        style={styles.postImage}
                        contentFit='cover'
                        transition={200}
                    />
                )
            }
        </View>
    )
}