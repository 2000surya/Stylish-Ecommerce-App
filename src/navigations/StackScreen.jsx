import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import OnboardScreen from "../screens/OnboardingScreens/OnboardScreen";
import LoginScreen from "../screens/authscreens/LoginScreen";

const StackScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="OnboardScreen">
      <Stack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;

const styles = StyleSheet.create({});
