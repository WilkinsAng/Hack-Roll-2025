import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen"
import LoginPage from "../components/LoginPage"

const Stack = createNativeStackNavigator({
    initialRouteName: "Home",
    screens:{
        Home: HomeScreen,
        Login: LoginPage
    }}
);

export type RootStackParamsList = {
    Home: undefined
    Login: undefined
}

export default function Index() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Welcome"}}/>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{title: "Login"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
