import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Alert, StyleSheet, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamsList} from "@/app";
import axios from "axios";
import {supabase} from "@/supabase";
import {Button} from "@react-navigation/elements";


type OnboardingPageNavigationProps = StackNavigationProp<RootStackParamsList, "Onboarding">;

const OnboardingPage: React.FC = () => {
    const navigation = useNavigation<OnboardingPageNavigationProps>();

    const [name, setName] = useState("");

    const handleOnboard = async () => {
        if(!name.trim()) {
            Alert.alert("You must have a name right?", "Write a name pls");
            return
        }

        const {data: {user} } = await supabase.auth.getUser();
        if(!user) {
            Alert.alert("You must log in!", "How did you even get here?");
            return
        }
        try {
            await axios.post("backendapi", {name, email: user.email})
            // Save name locally on system
            await AsyncStorage.setItem("username", name);

            Alert.alert('Successfully logged in');
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", "An error occurred.");
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName}/>
            <Button onPress={handleOnboard}>Done!</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    input: {

    }
})

export default OnboardingPage;