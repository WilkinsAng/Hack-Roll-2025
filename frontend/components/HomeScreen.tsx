import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {View, Text, StyleSheet, ScrollView, Image, Alert, ActivityIndicator, FlatList} from "react-native";
import {RootStackParamsList} from "../app/index";
import {Button} from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {supabase} from "@/supabase";
import axios from "axios";
import {Timestamp} from "react-native-reanimated/lib/typescript/commonTypes";


type HomeScreenNavigationProps = StackNavigationProp<RootStackParamsList, "Home">
interface Trip {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    createdAt: Timestamp,
}
const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProps>();

    const [name, setName] = useState<String | null>(null);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect( () => {
        setLoading(true);
        const fetchName = async () => {
            const storedName = await AsyncStorage.getItem("name");
            setName(storedName);
        };

        const fetchTrips = async () => {
            try {
                const {data: {user} } = await supabase.auth.getUser();
                if(!user) {
                    Alert.alert("No login?")
                    return
                }
                setIsAuthenticated(true);
                const response = await axios.get("", {params: user.email});
                setTrips(response.data);
            } catch (error:any) {
                Alert.alert(error.message);
            }
        }
        fetchName();
        fetchTrips();
        setLoading(false);
    }, []);

    const renderTrip = ({item}: {item: Trip}) => {
        return (
            <View>
                <Text>{item.name}</Text>
                <Text>{item.startDate.toDateString()} to {item.endDate.toDateString()}</Text>
            </View>
        );
    }
    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <Image source={require("../assets/images/logo.png")}/>
                    <ActivityIndicator size="large"/>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <Image source={require("../assets/images/logo.png")} />
                    <Text style={styles.header}>Welcome to Binary Balance {name || "How are you here?"}!</Text>


                    {/*Trip Section*/}
                    <View style={styles.tripsBox}>
                        {!isAuthenticated ?
                            <View>
                                <Button onPress={() => navigation.navigate('Login')}>Login</Button>
                                <Text>Log in to start being an accountable friend!</Text>
                            </View>:
                            <FlatList data={trips} renderItem={renderTrip}/>}
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