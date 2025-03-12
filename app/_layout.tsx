import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
// import { tokenCache } from "@/cache";
import InitialLayout from "@/components/InitialLayout";
import ClerkWithConvexProvider from "@/provider/ClerkWithConvexProvider";
import { StatusBar} from "expo-status-bar"
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import { Platform } from "react-native";
// import { StatusBar } from "react-native";

 
// clerk setup
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

// if (!publishableKey) {
//   throw new Error(
//     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
//   )
// }


useEffect(() => {
  if(Platform.OS === "android"){
    NavigationBar.setBackgroundColorAsync("#000000")
    NavigationBar.setButtonStyleAsync("light")
  }
},[])

export default function RootLayout() {
  return (
    // <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    //   <ClerkLoaded>
    <ClerkWithConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar style="light" backgroundColor="black" />
    </ClerkWithConvexProvider>
    //   </ClerkLoaded>
    // </ClerkProvider>
  )
}
