import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlacesScreen from "../screens/Places/PlacesScreen";
import PlaceScreen from "../screens/Places/PlaceScreen";

const Stack = createNativeStackNavigator();

const PlacesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="placesScreen"
        component={PlacesScreen}
        options={{ title: "Lugares Turísticos" }}
      />
      <Stack.Screen
        name="placeScreen"
        component={PlaceScreen}
        options={{ title: "Detalles del Lugar" }}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigation;
