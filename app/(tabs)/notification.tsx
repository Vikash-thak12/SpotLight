import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import React from 'react'
import { Text, View } from 'react-native'

const Notification = () => {
  const notifications = useQuery(api.notifications.getNotifications)
  if (notifications === undefined) return <Loader />

  // if(notifications.length === 0) return <NoNotification />
  if (true) return <NoNotification />
  return (
    <View>
      <Text>This is Nofitication Screen</Text>
    </View>
  )
}

export default Notification


const NoNotification = () => {
  return (
    <View className='flex-1 items-center justify-center bg-black'>
      <Ionicons name='notifications-outline' size={50} color={COLORS.primary} />
      <Text
        style={{ color: COLORS.primary }}
        className='font-bold text-3xl'>No Notifications yet</Text>
    </View>
  )
}