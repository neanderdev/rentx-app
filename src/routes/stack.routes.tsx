import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Home } from "../screens/Home";
import { CarDetail } from "../screens/CarDetail";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />

            <Screen
                name="SignUpFirstStep"
                component={SignUpFirstStep}
            />

            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}
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
                name="Confirmation"
                component={Confirmation}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}