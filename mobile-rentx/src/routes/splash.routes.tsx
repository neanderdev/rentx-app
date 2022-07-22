import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/auth';

import { Splash } from '../screens/Splash';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function SplashRoutes() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Home"
        component={user.id ? AppTabRoutes : AuthRoutes}
      />
    </Navigator>
  )
}