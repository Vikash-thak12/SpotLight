import Loader from '@/components/Loader'
import NotificationItem from '@/components/NotificationItem'
import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { styles } from '@/styles/notification.syles'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const Notification = () => {
  const notifications = useQuery(api.notifications.getNotifications)
  if (notifications === undefined) return <Loader />

  if(notifications.length === 0) return <NoNotification />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className="text-center" style={styles.headerTitle}>Notifications</Text>
      </View>


      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        showsVerticalScrollIndicator={true}
      />
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