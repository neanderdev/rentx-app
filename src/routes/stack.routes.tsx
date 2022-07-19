import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { Home } from "../screens/Home";
import { CarDetail } from "../screens/CarDetail";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SignIn"
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />

            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
            />

            <Screen
                name="CarDetail"
                component={CarDetail}
            />

            <Screen
                name="Scheduling"
                component={Scheduling}
            />

            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />

            <Screen
                name="SchedulingComplete"
                component={SchedulingComplete}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}