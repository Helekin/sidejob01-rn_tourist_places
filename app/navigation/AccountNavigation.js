import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/Account/AccountScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import LoginScreen from "../screens/Account/LoginScreen";

const Stack = createNativeStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Iniciar Sesión" }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
