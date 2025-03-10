import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { formatDistanceToNow} from "date-fns"
import { styles } from '@/styles/feed.styles';

interface Comment{
    user: {
        fullname: string | undefined;
        image: string | undefined;
    };
    _creationTime: number;
    content: string;
}

export default function CommentComp({ comment }: { comment: Comment }) {
  return (
    <View style={styles.commentContainer}>
      <Image source={{uri: comment.user.image}} style={styles.commentAvatar} />
      <View>
        <Text className='text-white'>{comment.user.fullname}</Text>
        <Text className='text-white'>{comment.content}</Text>
        <Text className='text-white'>
            {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  )
}