import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
        <Text className="font-bold text-xl" style={styles.headerTitle}>GetConnect</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>


      {/* Stoies section */}
      <FlatList
        data={STORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Story story={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      />
      {/* <ScrollView
        style={styles.storiesContainer}
        horizontal
        showsHorizontalScrollIndicator={true}
      >
        {
          STORIES.map((story) => (
            <Story key={story.id} story={story} />
          ))
        }
      </ScrollView> */}

      {/* Posts Section */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
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