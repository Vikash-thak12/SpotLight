import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Image } from "expo-image";
import { style } from '@/styles/create.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.8,
    });


    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl)
  const createPost = useMutation(api.posts.createPost)

  const handleShare = async () => {
    if(!selectedImage) return;
    try {
      setIsSharing(true);
      const uploadUrl = await generateUploadUrl();
      const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedImage, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        mimeType: 'image/jpeg',
      })

      if(uploadResult.status !== 200) {
        throw new Error("Failed to upload image");
      }

      const { storageId } = JSON.parse(uploadResult.body);
      await createPost({ caption, storageId });

      setSelectedImage(null); 
      setCaption("")
      router.push("/(tabs)")
    } catch (error) {
      console.error("Error sharing post:", error);
    } finally{
      setIsSharing(false);
    }
  }


  if (!selectedImage) {
    return (
      <View className='bg-gray-300 flex-1 px-2 py-2'>
        {/* Header */}
        <View className='flex-row items-center justify-between bg-gray-500 p-2'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text className='font-bold'>New Post</Text>
          <Text></Text>
        </View>

        {/* Select Image */}
        <TouchableOpacity className='flex items-center justify-center mt-4 h-[85%] bg-gray-500' onPress={pickImage}>
          <Ionicons name='image-outline' size={60} color={COLORS.grey} />
          <Text>Tap to Select an Image</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
    >
      <View style={style.contentContainer}>
        {/* Header */}
        <View className='flex-row items-center justify-between bg-gray-500 p-2'>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null);
              setCaption("");
            }}
            disabled={isSharing}
          >
            <Ionicons name='close-outline' size={32} color={COLORS.primary} />
          </TouchableOpacity>
          <Text className='font-bold'>New Post</Text>
          <TouchableOpacity
          disabled={isSharing || !selectedImage}
          onPress={handleShare}
          >
            {
              isSharing ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Text className='font-bold'>Share</Text>
              )
            }
          </TouchableOpacity>
        </View>


        {/* body */}
        <ScrollView
          contentContainerStyle={style.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps='handled'
          contentOffset={{ x: 0, y: 100}}
        >
          <View>

            {/* Image Section */}
            <View style={style.imageSection}>
              <Image
                source={selectedImage}
                style={{ width: '100%', height: '100%' }}
                contentFit='cover'
                transition={200}
              />
              <TouchableOpacity style={style.changeImageButton} onPress={pickImage} className='px-4 py-2'>
                <Ionicons name='image-outline' size={28} color={COLORS.primary} />
                <Text className='text-white'>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Input Section */}
            <View className='flex-1 p-5'>
              <View className='flex-row items-start gap-5'>
                <Image
                  source={user?.imageUrl}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  contentFit='cover'
                  transition={200}
                />
                <TextInput
                  style={style.captionInput}
                  className='flex-1 fontsize-16 placeholder:text-gray-500'
                  value={caption}
                  onChangeText={setCaption}
                  placeholder='Write a caption...'
                  multiline
                  editable={!isSharing}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}