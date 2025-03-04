import { Text, TouchableOpacity, View, Image } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl text-purple-600">Vikash</Text>
      <TouchableOpacity onPress={() => alert("You Touched the screen")} className="border px-5 py-3 rounded-2xl">
        <Text className="font-bold text-2xl">Touch Here</Text>
      </TouchableOpacity>
      <View className="flex gap-2 mt-5">
        <Link href={"/profile"} className="border px-1 text-center py-2 rounded-lg">Profile Screen</Link>
        <Link href={"/notification"} className="border px-1 text-center py-2 rounded-lg">Notification Screen</Link>
      </View>
      {/* <Image
        source={{ uri: "https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
        className="w-96 h-96 mt-5 rounded-lg"
      />
      <Image
        source={require("../assets/images/react-logo.png")}
        className="w-96 h-96"
      /> */}
    </View>
  );
}