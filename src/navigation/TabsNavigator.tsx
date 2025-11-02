import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenNames } from "./routes";
import HomeScreen from "../screens/tabs/HomeScreen";
import SearchScreen from "../screens/tabs/SearchScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import { colors } from "../constants/colors";
import { globalStyles } from "../constants/styles";
import Feather from "@expo/vector-icons/Feather";
import Wishlist from "../screens/tabs/Wishlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.iconSecondary,
        tabBarLabelStyle: { ...globalStyles.font12Medium, fontSize: 10.5 },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,

          height: insets.bottom + 70,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name={screenNames.home}
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: (tab) => (
            <Feather name="home" size={18} color={tab.color} />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.search}
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: (tab) => (
            <Feather name="search" size={18} color={tab.color} />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.favourite}
        component={Wishlist}
        options={{
          title: "Wishlist",
          tabBarIcon: (tab) => (
            <Feather name="heart" size={18} color={tab.color} />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.profile}
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: (tab) => (
            <Feather name="user" size={18} color={tab.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({});
