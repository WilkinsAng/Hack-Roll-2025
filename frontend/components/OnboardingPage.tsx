import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {View} from "react-native";


const OnboardingPage: React.FC = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");


    return (
        <View>

        </View>
    );
}

export default OnboardingPage;