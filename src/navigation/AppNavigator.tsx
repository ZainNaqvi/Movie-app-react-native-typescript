import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Colors } from "../core/color";

import {
    MovieListScreen,
    MovieDetailScreen,
    SearchScreen,
    SeatSelectionScreen,
} from "../screens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const renderIcon = (iconName: string, size: number = scale(22)) =>
    ({ color }: { color: string }) => (
        <Icon name={iconName} size={size} color={color} />
    );

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.muted,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
                tabBarIconStyle: styles.tabBarIconStyle,
            }}
        >
            <Tab.Screen
                name="Dashboard"

                component={() => null}
                options={{
                    tabBarLabel: "Dashboard",
                    tabBarIcon: renderIcon("grid", scale(22)),

                }}
            />
            <Tab.Screen
                name="Watch"
                component={MovieListScreen}
                options={{
                    tabBarLabel: "Watch",
                    tabBarIcon: renderIcon("play", scale(24)),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Downloaded"
                component={() => null}
                options={{
                    tabBarLabel: "Downloads",
                    tabBarIcon: renderIcon("download", scale(22)),
                }}
            />
            <Tab.Screen
                name="More"
                component={() => null}
                options={{
                    tabBarLabel: "More",
                    tabBarIcon: renderIcon("more", scale(22)),
                }}
            />

        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" component={BottomTabs} />

                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
                <Stack.Screen name="Seats" component={SeatSelectionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: verticalScale(90),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        backgroundColor: Colors.tabBg,
        position: "absolute",
        bottom: -10,
    },
    tabLabel: {
        fontSize: moderateScale(12),
        position: "absolute",
        bottom: verticalScale(12),
    },
    tabBarIconStyle: {
        fontSize: moderateScale(12),
       
        top: verticalScale(12),
    }
});
