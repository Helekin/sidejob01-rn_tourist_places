import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import AccountNavigation from "./AccountNavigation";
import PlacesNavigation from "./PlacesNavigation";
import FavoritesNavigation from "./FavoritesNavigation";
import SearchNavigation from "./SearchNavigation";
import TopPlacesNavigation from "./TopPlacesNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="touristplaces"
          component={PlacesNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Lugares",
            tabBarIcon: ({ color }) => {
              return (
                <Icon
                  type="material-community"
                  name="home-outline"
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="searchplaces"
          component={SearchNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Búsqueda",
            tabBarIcon: ({ color }) => {
              return (
                <Icon
                  type="material-community"
                  name="home-search-outline"
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="topplaces"
          component={TopPlacesNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Top 10",
            tabBarIcon: ({ color }) => {
              return (
                <Icon
                  type="material-community"
                  name="star-outline"
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="favoritesplaces"
          component={FavoritesNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ color }) => {
              return (
                <Icon
                  type="material-community"
                  name="heart-outline"
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="userAccount"
          component={AccountNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Usuario",
            tabBarIcon: ({ color }) => {
              return (
                <Icon
                  type="material-community"
                  name="account-outline"
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
