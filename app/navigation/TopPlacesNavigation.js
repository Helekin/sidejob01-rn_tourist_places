import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopPlacesScreen from "../screens/TopPlaces/TopPlacesScreen";

const Stack = createNativeStackNavigator();

const TopPlacesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="topPlacesScreen"
        component={TopPlacesScreen}
        options={{ title: "Top 10" }}
      />
    </Stack.Navigator>
  );
};

export default TopPlacesNavigation;
