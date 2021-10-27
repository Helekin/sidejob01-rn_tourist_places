import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/Search/SearchScreen";

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="searchScreen"
        component={SearchScreen}
        options={{ title: "Búsqueda" }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
