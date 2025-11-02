import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./routes";
import ListingDetails from "../screens/listingDetails/ListingDetails";

const Stack = createNativeStackNavigator();

const ScreensNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames.listingDetails}
        component={ListingDetails}
      />
    </Stack.Navigator>
  );
};

export default ScreensNavigator;

const styles = StyleSheet.create({});
