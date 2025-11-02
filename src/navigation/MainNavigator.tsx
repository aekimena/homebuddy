import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./routes";
import TabsNavigator from "./TabsNavigator";
import ScreensNavigator from "./ScreensNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name={screenNames.tabs} component={TabsNavigator} />
      <Stack.Screen name={screenNames.screens} component={ScreensNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
