import React, {useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamsList} from "@/app";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, View, Alert, TextInput, Button} from "react-native";
import {supabase} from "../supabase";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginPageNavigationProps = StackNavigationProp<RootStackParamsList, "Login">

const LoginPage: React.FC = () => {

    const navigation = useNavigation<LoginPageNavigationProps>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginWithEmailAndPassword = async () => {
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
            return
        }

        try {
            const response = await axios.get("");
            const userProfile = response.data;
            await AsyncStorage.setItem('username', userProfile.name);
        } catch (error: any) {
            Alert.alert(error.message);
            return
        } finally {
            setLoading(false);
        }
        navigation.goBack();
    }

    const signUpWithEmailAndPassword  = async () => {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
            setLoading(false);
            return
        }
        if (!session) Alert.alert('Please check your inbox for email verification!')

        setLoading(false);
        navigation.navigate("Onboarding");
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => loginWithEmailAndPassword()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmailAndPassword()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})
export default LoginPage;