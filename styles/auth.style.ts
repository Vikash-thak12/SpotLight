import { Dimensions, StyleSheet} from "react-native"

const { width, height} = Dimensions.get("window")
export const styles = StyleSheet.create({
    brandSection: {
        alignItems: "center", 
        marginTop: height * 0.12,
    },
    illustrationContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingHorizontal: 40, 
        
    }, 
    illustration: {
        width: width * 0.75,
        height: height * 0.75, 
        maxHeight: 280,
    }
})