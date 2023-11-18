import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";


export default function Header() {
    // const [fontsLoaded] = useFonts({
    //     Roboto_700Bold: require("../../assets/Roboto-Bold.ttf"),
    // });
    // if (!fontsLoaded) {
    //     return null;
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>SPLI</Text>
            <Text style={styles.text}>TTER</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        // height: 288,
        alignItems: "center",
        marginTop: 72,
        paddingBottom: 72,

    },
    text: {
        height: 36,
        justifyContent: "center",
        textAlign: "center",
        marginBottom: 16,
        fontSize: 30,
        color: '#00464e',
        fontWeight: '900',
        letterSpacing: 4,
        // fontFamily: "Roboto_700Medium",
    },
});