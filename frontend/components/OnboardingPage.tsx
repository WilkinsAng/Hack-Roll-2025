import React, {useState} from "react";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Alert, StyleSheet, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamsList} from "@/app/app";
import axios from "axios";
import {Button} from "@react-navigation/elements";


type OnboardingPageNavigationProps = StackNavigationProp<RootStackParamsList, "Onboarding">;
type OnboardingPageRouteProps = RouteProp<RootStackParamsList, "Onboarding">;
const OnboardingPage: React.FC = () => {
    const navigation = useNavigation<OnboardingPageNavigationProps>();
    const route = useRoute<OnboardingPageRouteProps>();
    const {id, email} = route.params;

    const [name, setName] = useState("");

    const handleOnboard = async () => {
        if(!name.trim()) {
            Alert.alert("You must have a name right?", "Write a name pls");
            return
        }

        try {
            await axios.post(`https://hack-roll-2025.onrender.com/api/users`, {id: id, name: name, email: email})
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