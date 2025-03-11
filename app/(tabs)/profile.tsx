import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import { useAuth } from "@clerk/clerk-react"
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"


const Profile = () => {
  const { signOut, userId } = useAuth();
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const currentUser = useQuery(api.users.getUserByClerk, userId ? { clerkId: userId } : "skip");

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname,
    bio: currentUser?.bio
  })

  const [seletectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.posts.getPostbyUser, {})

  const handleUpdateProfile = () => {

  }

  if (!currentUser || posts === undefined) return <Loader />

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.username}>{currentUser.username}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          {/* Avatar */}
          <View style={styles.avatarAndStats}>
            <View style={styles.avatarContainer}>
              <Image
                source={currentUser.image}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentUser.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* Full name and bio */}
          <Text style={styles.name}>{currentUser.fullname}</Text>
          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

          {/* Edit option */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsModalEditVisible(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {posts.length == 0 && <NoPostFound /> }

        {/* showing the images or posts */}
        <FlatList
        data={posts}
        numColumns={3}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedPost(item)}>
            <Image
            source={item.imageUrl}
            style={styles.gridImage}
            contentFit="cover"
            transition={200}
             />
          </TouchableOpacity>
        )}
         />
      </ScrollView>


      {/* Edit Profile modal  */}
      {/* Selected Image Modal */}
      <Modal
      visible={!!seletectedPost}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setSelectedPost(null)}
      >
        <View style={styles.modalBackdrop}>
          {
            seletectedPost && (
              <View style={styles.postDetailContainer}>
                <View style={styles.postDetailHeader}>
                  <TouchableOpacity onPress={() => setSelectedPost(null)}>
                    <Ionicons name="close" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>

                <Image
                source={seletectedPost.imageUrl}
                style={styles.postDetailImage}
                cachePolicy={"memory-disk"}
                 />

              </View>
            )
          }
        </View>
      </Modal>
    </View>
  )
}

export default Profile


const NoPostFound = () => {
  return(
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold">No Posts Yet</Text>
    </View>
  )
}