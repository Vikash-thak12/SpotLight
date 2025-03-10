import { COLORS } from "@/constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

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
    }, 
    modalContainer: {
        backgroundColor: COLORS.background,
        flex: 1,
        // marginBottom: Platform.OS === "ios" ? 44 : 0, 
        // marginTop: Platform.OS === "ios" ? 44 : 0
    }, 

    modalHeader: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16, 
        height: 56, 
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface
    }, 
    commentContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    }, 
    commentAvatar: {
        width: 32, 
        height: 32, 
        borderRadius: 16, 
        marginRight: 12, 
    },
    commentContent: {
        flex: 1, 
    }, 
    commentText: {
        lineHeight: 20,
    }, 
    commentInput: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10, 
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: COLORS.background
    }, 
    input: {
        backgroundColor: COLORS.background, 
        color: COLORS.white, 
        flex: 1, 
        borderRadius: 10, 
        paddingHorizontal: 20
    }, 
    postButton: {
        color: COLORS.primary,
        fontWeight: "600", 
        fontSize: 14,
    },
    postButtonDisabled: {
        opacity: 0.5,
    }
})