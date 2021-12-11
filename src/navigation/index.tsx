import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import CustomBottomTab from "../components/BottomTab";
import Complexes from "../screens/Complexes";
import LoginScreen from "../screens/LoginScreen";
import CimetiereLaval from "../screens/CimetiereLaval";
import LesSentiers from "../screens/LesSentiers";

import ListModules from "../screens/ListModules";
import Prepose from "../screens/Prepose";
import Transport from "../screens/Transport";


import CreatePremierAvis from "../screens/CreatePremierAvis";

import TombeListe from "../screens/TombeListe";


import Tombe from "../screens/Tombe";
import AddTombe from "../screens/AddTombe";
import Camera from "../screens/Camera";
import SyncStorage from 'sync-storage';

import PremierAvisIntro from "../screens/PremierAvisIntro";
import NosServices from "../screens/Services";
import CustomSidebar from "../screens/Sidebar";
import WelcomeScreen from "../screens/WelcomeScreen";
import ServicesDetails from "../screens/ServicesDetails";
import Ceromonie from "../screens/Ceremonie";

import {
    AvisStackParamList,
    BottomTabParamList,
    DossierStackParamList,
    DrawerStackParamList,
    LoginStackParamList,
    RootStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import * as Font from 'expo-font';


http://localhost:17999/api/Ratings?filter={%22where%22:{%22itemId%22:54053}}

global.Host = "localhost:17999/api/";

global.Protocol = "http:/";
global.Ratings = "Ratings";

// global.HostEtablissement = "192.168.1.6";
// global.Protocol = "http";
// global.fmDatabaseEtablissement = "MAG__Systeme";




type InitialRouteNames = "Logout" | "Login";
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
    colorScheme,
    initialRouteName,
}: {
    colorScheme: ColorSchemeName;
    initialRouteName: InitialRouteNames;
}) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <RootNavigator initialRouteName={initialRouteName} />
        </NavigationContainer>
    );
}




const LoginStack = createStackNavigator<LoginStackParamList>();
function LoginNavigator() {
    return (
        <LoginStack.Navigator screenOptions={{ headerShown: false }} mode="modal">
            <LoginStack.Screen name="Welcome" component={WelcomeScreen} />

        </LoginStack.Navigator>
    );
}



// Read more here: https://reactnavigation.org/docs/modaDrawerNavigator
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({ initialRouteName }: { initialRouteName: InitialRouteNames }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
            <Stack.Screen options={{ animationEnabled: false }} name="Logout" component={LoginNavigator} />


        </Stack.Navigator>
    );
}
