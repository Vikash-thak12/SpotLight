import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

// watch from 2:47

export const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20, 
        fontFamily: "JetBrainsMono-medium",
        color: COLORS.primary
    }, 
    storiesContainer: {
        paddingVertical: 10, 
        borderBottomWidth: 0.5,     
        borderBottomColor: COLORS.surface
    }, 

    storyWrapper: {
        alignItems: "center",
        marginHorizontal: 8, 
        width: 72
    }, 
    storyRing: {
        width: 68,
        height: 68,
        borderRadius: 50,
        padding: 2, 
        backgroundColor: COLORS.background, 
        borderWidth: 2, 
        borderColor: COLORS.primary,
        marginBottom: 4
    }, 

    noStory: {
        borderColor: COLORS.grey
    }, 

    storyAvatar: {
        width: 60, 
        height: 60,
        borderRadius: 30,
        borderWidth: 2, 
        borderRightColor: COLORS.background
    }, 

    storyUsername: {
        fontSize: 11, 
        color: COLORS.white, 
        textAlign: "center"
    }, 
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12
    }, 
    postHeaderleft: {
        flexDirection: "row", 
        alignItems: "center"
    }, 
    postImage: {
        width: width, 
        height: width
    }
})