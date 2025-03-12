import { View, Text, TouchableOpacity, FlatList, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Loader from '@/components/Loader';
import { styles } from '@/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { Image } from 'expo-image';

export default function UserProfile() {
    const { id } = useLocalSearchParams();
    const router = useRouter();


    const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> })
    const posts = useQuery(api.posts.getPostbyUser, { userId: id as Id<"users"> })

    const isFollowing = useQuery(api.users.isFollowing, { followingId: id as Id<"users"> })

    const toggleFollow = useMutation(api.users.toggleFollow)

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)")
    }

    if (profile === undefined || posts === undefined || isFollowing === undefined) return <Loader />;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{profile.username}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileInfo}>
                    {/* Avatar */}
                    <View style={styles.avatarAndStats}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={profile.image}
                                style={styles.avatar}
                                contentFit="cover"
                                transition={200}
                            />
                        </View>
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{profile.posts}</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>

                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{profile.followers}</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>

                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{profile.following}</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>

                    {/* Full name and bio */}
                    <Text style={styles.name}>{profile.fullname}</Text>
                    {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
                </View>


                {/* Follow Button */}
                <Pressable className='my-5' onPress={() => toggleFollow({ followingId: id as Id<"users"> })} style={[styles.followButton, isFollowing && styles.followingButton]}>
                    <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                        {isFollowing ? "Following" : "Follow"}
                    </Text>
                </Pressable>

                {/* showing the images or posts */}
                {
                    posts.length === 0 ? (
                        <View style={styles.noPostsContainer}>
                            <Ionicons name='images-outline' size={32} color={COLORS.white} />
                            <Text style={styles.noPostsText}>No Posts Yet</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={posts}
                            numColumns={3}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.gridItem}>
                                    <Image
                                        source={item.imageUrl}
                                        style={styles.gridImage}
                                        contentFit="cover"
                                        transition={200}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    )
                }
            </ScrollView>
        </View>
    )
}