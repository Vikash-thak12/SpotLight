import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import { STORIES } from "@/constants/mock-data";
import Story from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/Loader";
import Post from "@/components/Post";

export default function Index() {
  const { signOut } = useAuth();

  // fetch posts from the server
  const posts = useQuery(api.posts.getFeedPosts)
  if (posts === undefined) return <Loader />

  if (posts.length === 0) return <NopostsFound />


  return (
    <View className="flex-1 p-2 bg-black">
      {/* Header Section */}
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-xl" style={styles.headerTitle}>SpotLight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>


      {/* todo: add scroll indicator */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories Section */}
        <ScrollView
          style={styles.storiesContainer}
          horizontal
          showsHorizontalScrollIndicator={true}
        >
          {
            STORIES.map((story) => (
              <Story key={story.id} story={story} />
            ))
          }
        </ScrollView>


        {/* Feed Section */}
        {
          posts.map((post) => (
            <Post key={post._id} post={post} />
            // <View className="flex gap-5">
            // </View>
          ))
        }
      </ScrollView>
    </View>
  );
}



const NopostsFound = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>No posts found</Text>
    </View>
  )
}