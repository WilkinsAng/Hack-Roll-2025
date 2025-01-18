import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {View, Text, StyleSheet} from "react-native";
import {RootStackParamsList} from "../app/index";
import {Button} from "@react-navigation/elements";


type HomeScreenNavigationProps = StackNavigationProp<RootStackParamsList, "Home">

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProps>();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to the Home Page!</Text>
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
            {/*Trip Section*/}
            <View style={styles.tripsBox}>

            </View>


        </View>
)}

const styles = StyleSheet.create( {
    container: {},
    header: {},
    tripsBox: {}
})
export default HomeScreen;