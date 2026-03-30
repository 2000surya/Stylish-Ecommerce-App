import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";

import Home from "../screens/Home";
import OnboardScreen from "../screens/OnboardingScreens/OnboardScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/authscreens/LoginScreen";
import SignUp from "../screens/authscreens/SignUp";

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <SplashScreen />; // or loader

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      initialRouteName={user ? "Home" : "OnboardScreen"}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default StackScreen;
