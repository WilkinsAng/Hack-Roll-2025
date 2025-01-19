import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen"
import LoginPage from "../components/LoginPage"
import OnboardingPage from "../components/OnboardingPage"
import SplashScreen from "@/components/SplashScreen";
import AddTripForm from "@/components/AddTripForm";

const Stack = createNativeStackNavigator({
    initialRouteName: "Splash",
    screens:{
        Splash: SplashScreen,
        Home: HomeScreen,
        Login: LoginPage,
        Onboarding: OnboardingPage,
        AddTrip: AddTripForm
    }}
);

export type RootStackParamsList = {
    Splash: undefined,
    Home: undefined
    Login: undefined
    Onboarding: {
        id: string
        email: string
    }
    AddTrip: undefined
}

export default function Index() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
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
            <Stack.Screen
                name="AddTrip"
                component={AddTripForm}
                options={{title: "Adding Trips"}}/>
        </Stack.Navigator>
    );
}
