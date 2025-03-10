import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { Image } from 'expo-image'

export default function BookMarks() {
  const bookmarks = useQuery(api.bookmarks.getBookmarks)
  if (bookmarks === undefined) return <Loader />

  if (bookmarks.length === 0) return <NoBookmarks />
  return (
    <View className='flex-1 bg-black'>
      <View>
        <Text className='text-center font-bold py-2 text-2xl' style={{ color: COLORS.primary }}>BookMarks</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >

        {
          bookmarks.map((post) => {
            if (!post) return null;
            return (
              <View key={post._id} style={{ width: "33.33%"}}>
                <Image
                  source={post.imageUrl}
                  style={{ width: 100, height: 100, aspectRatio: 1 }}
                  contentFit='cover'
                  transition={200}
                  cachePolicy="memory-disk"
                />
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const NoBookmarks = () => {
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <Text
        style={{ color: COLORS.primary }}
        className='font-bold text-2xl'>No BookMarks</Text>
    </View>
  )
}