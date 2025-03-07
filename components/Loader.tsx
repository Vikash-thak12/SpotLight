import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'

export default function Loader() {
  return (
    <View className='flex-1 align-center justify-center bg-black'>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}