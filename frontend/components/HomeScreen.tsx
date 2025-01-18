import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import {RootStackParamsList} from "../app/index";
import {Button} from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


type HomeScreenNavigationProps = StackNavigationProp<RootStackParamsList, "Home">

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProps>();

    const [name, setName] = useState<String | null>(null);

    useEffect( () => {
        const fetchName = async () => {
            const storedName = await AsyncStorage.getItem("name");
            setName(storedName);
        };
        fetchName();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <Image source={require("../assets/images/logo.png")} />
                    <Text style={styles.header}>Welcome to Binary Balance {name || "How are you here?"}!</Text>
                    <Button onPress={() => navigation.navigate('Login')}>Login</Button>

                    {/*Trip Section*/}
                    <View style={styles.tripsBox}>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>



    )}

const styles = StyleSheet.create( {
    container: {},
    header: {},
    tripsBox: {}
})
export default HomeScreen;