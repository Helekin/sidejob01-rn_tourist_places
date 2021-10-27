import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesScreen from "../screens/Favorites/FavoritesScreen";

const Stack = createNativeStackNavigator();

const FavoritesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Stack.Navigator>
  );
};

export default FavoritesNavigation;
