import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from './Loader'
import CommentComp from './CommentComp'
import { styles } from '@/styles/feed.styles'

type commentsModal = {
  postId: Id<"posts">,
  visible: boolean,
  onClose: () => void,
  onCommentAdded: () => void

}

export default function CommentsModal({ postId, visible, onClose, onCommentAdded }: commentsModal) {
  const [newComment, setNewComment] = useState("");

  const comments = useQuery(api.comments.getCommnets, { postId });
  const addComment = useMutation(api.comments.addComment);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({
        content: newComment,
        postId
      })

      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.log("Error in handleComment: ", error)

    }
  }

  return (
    <Modal
      // style={{ flex: 1, backgroundColor: 'white' }}
      visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{ flex: 1 }}
        style={styles.modalContainer}
      >
        <View className='bg-black px-4 py-2'>
          <View className='flex-row items-center justify-between p-4'>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name='close' size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={{ color: COLORS.primary }}>Comments</Text>
            <Text></Text>
          </View>
        </View>

        {
          comments === undefined ? <Loader /> :
            (
              <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <CommentComp comment={item} />}
                style={{ flex: 1 }}
              />
            )
        }

        <View style={styles.commentInput}>
          <TextInput
            style={{ backgroundColor: 'grey', color: 'white', flex: 1, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder="Add a comment"
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity onPress={handleComment}>
            <Text className='text-white'>Post</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </Modal>
  )
}