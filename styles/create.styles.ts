import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    }, 
    contentContainer: {
        flex: 1
    }, 
    contentDisabled: {
        opacity: 0.7
    }, 
    shareButton: {
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        minWidth: 60, 
        alignItems: "center",
        justifyContent: "center",
    }, 
    shareButtonDisabled: {
        opacity: 0.7
    }, 
    scrollContent: {
        flexGrow: 1, 
    }, 
    imageSection: {
        width: width, 
        height: width,
        backgroundColor: COLORS.surface, 
        justifyContent: "center",
        alignItems: "center",
    }, 
    changeImageButton: {
        position: "absolute",
        bottom: 16, 
        right: 16,
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        gap: 4,
    }, 
    captionInput: {
        color: COLORS.white, 
        minHeight: 40, 
        paddingTop: 8
    }
})