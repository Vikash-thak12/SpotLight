import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '@/styles/auth.style'

export default function login() {
  return (
    // style={{ backgroundColor: COLORS.background}}
    <View className='flex-1 px-2 bg-black'>

      // Brand Section
      <View className='mt-20 flex items-center'>
        <View>
          <Ionicons name='leaf' size={42} color={COLORS.primary} />
        </View>
        <Text style={{ color: COLORS.primary }} className='font-bold text-3xl mt-5'>SpotLight</Text>
        <Text className='text-base text-neutral-500 mt-2'>don't miss anything</Text>
      </View>

      // image section
      <View className='max-h-96 flex-1 items-center justify-center mt-10'>
        <Image source={require("../../assets/images/logo.png")} style={styles.illustration} resizeMode='contain' />
      </View>

      // google auth
      <View className='mt-14 mx-10'>
        <TouchableOpacity 
        onPress={() => alert("You are Signing")}
        className='flex flex-row items-center justify-center py-4 gap-4 border rounded-xl bg-white'
        >
          <View>
            <Ionicons name='logo-google' size={30} color={COLORS.surface} />
          </View>
          <Text className='font-bold text-lg'>Continue With Google</Text>
        </TouchableOpacity>

        <Text className='mt-4 text-xs text-white'>
          By Continuing, You agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  )
}