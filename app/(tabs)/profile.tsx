import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from "react-native"

const Profile = () => {
  const [showEditable, setShowEditable] = useState(false)


  const { user } = useUser()
  const currentUser = useQuery(api.users.getUserByClerk, user ? { clerkId: user.id } : "skip")
  if (user == null) return <Loader />


  // console.log("Current User", currentUser)


  return (
    <View className='flex-1 bg-black'>
      {/* <Text className='text-white'>This is Profile Screen</Text>
      <Text className='text-white'>{user?.fullName}</Text> */}

      {/* Header */}
      <View
        style={{
          backgroundColor: COLORS.background,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text className='text-white font-bold text-xl'>{user.fullName}</Text>
        <Ionicons name='log-out-outline' size={28} color={COLORS.primary} />
      </View>

      {/* user Information */}
      <View className='mt-10 flex-row'>
        <Image source={currentUser?.image} style={{ width: 100, height: 100, borderRadius: 50 }} contentFit='cover' transition={200} />
        <View className='flex-row items-center justify-around flex-1'>
          <View className='flex items-center'>
            <Text className='text-white'>{currentUser?.posts}</Text>
            <Text className='text-white'>Posts</Text>
          </View>

          <View className='flex items-center'>
            <Text className='text-white'>{currentUser?.followers}</Text>
            <Text className='text-white'>Followers</Text>
          </View>

          <View className='flex items-center'>
            <Text className='text-white'>{currentUser?.following}</Text>
            <Text className='text-white'>Following</Text>
          </View>

        </View>
      </View>

      <View className='mt-10'>
        <Text className='text-white'>{currentUser?.fullname}</Text>
        <Text className='text-white'>
          {currentUser?.bio}
        </Text>
      </View>

      {/* Edit profile section */}
      <View>
        <TouchableOpacity onPress={() => setShowEditable(true)} style={{ backgroundColor: COLORS.primary, width: "50%", padding: 10, borderRadius: 5 }}>
          <Text className='text-center'>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {
        showEditable && (
          <Modal
            animationType='slide'
            style={{ flex: 1, backgroundColor: COLORS.background }}>
            <View className='flex-1 bg-black'>
              {/* Header */}
              <View className='flex-row items-center justify-between px-8 py-4'>
                <Text className='text-white'>Edit Profile</Text>
                <Ionicons name='close' size={32} color={COLORS.primary} />
              </View>
            </View>
          </Modal>
        )
      }
    </View>

  )
}

export default Profile
