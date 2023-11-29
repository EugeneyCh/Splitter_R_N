import { Button, ScrollView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react"

const ValidationTextInput = (props) => {
    const [text, setText] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string>('')

    return (
        <View style={styles.container} >
            <Text style={styles.msg}>{validationMessage}</Text>
            <TextInput value={text} />
        </View>
    );
}
export default ValidationTextInput;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        marginHorizontal: 16,
    },
    msg: {
        color: 'red',
    },
});