import React, { useEffect, useState } from "react";
import {supabase} from "@/supabase";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamsList} from "@/app";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, Alert, Image} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";


type SplashScreenNavigationProps = StackNavigationProp<RootStackParamsList, "Splash">

const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProps>();

    useEffect(() => {
        const checkSession = async ()=> {
            const {data, error} = await supabase.auth.getSession();
            if (error) Alert.alert(error.message);

            if(data.session) {
                navigation.navigate("Home");
            } else {
                navigation.navigate("Login");
            }
        }
        checkSession();
    }, [navigation]);
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Image source={require("../assets/images/logo.png")} />
                <ActivityIndicator size="large" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default SplashScreen;