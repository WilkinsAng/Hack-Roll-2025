import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen"
import LoginPage from "../components/LoginPage"
import OnboardingPage from "../components/OnboardingPage"

const Stack = createNativeStackNavigator({
    initialRouteName: "Home",
    screens:{
        Home: HomeScreen,
        Login: LoginPage,
        Onboarding: OnboardingPage
    }}
);

export type RootStackParamsList = {
    Home: undefined
    Login: undefined
    Onboarding: undefined
}

export default function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Welcome"}}/>
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{title: "Login"}}/>
            <Stack.Screen
            name="Onboarding"
            component={OnboardingPage}
            options={{title: "Onboarding"}}/>
        </Stack.Navigator>
    );
}
