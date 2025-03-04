import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
    const { isLoaded, isSignedIn} = useAuth(); 
    const segments = useSegments(); 
    const router = useRouter(); 

    useEffect(() => {
        if(!isLoaded) return; 
        // 	["(auth)", "login"]
        const isAuthScreen = segments[0] == "(auth)"; 
        // user signin nahi hai aur wo authscreen par nahi hai (matlab wo actual screens main hai without authentication)
        if(!isSignedIn && !isAuthScreen){
            router.replace("/(auth)/login")
            // user authenticate hai aur wo login screen par hai toh wose bhej do tabs screen par 
        } else if(isSignedIn && isAuthScreen){
            router.replace("/(tabs)")
        }
    },[isLoaded, isSignedIn, segments])

    if(!isLoaded) return null;

    return <Stack screenOptions={{ headerShown: false}} />

}