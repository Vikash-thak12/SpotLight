import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl text-purple-600">kritika</Text>
      <TouchableOpacity onPress={() => alert("You Touched the screen")} className="border px-5 py-3 rounded-2xl">
        <Text className="font-bold text-2xl">Touch Here</Text>
      </TouchableOpacity>
      <View className="flex gap-2 mt-5">
        <Link href={"/profile"} className="border px-1 text-center py-2 rounded-lg">Profile Screen</Link>
        <Link href={"/notification"} className="border px-1 text-center py-2 rounded-lg">Notification Screen</Link>
      </View>
    </View>
  );
}