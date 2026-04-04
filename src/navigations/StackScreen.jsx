import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AppHeader from "../components/commonComponents/AppHeader";
import { auth } from "../config/firebase";
import DetailsScreen from "../screens/DetailsScreen";
import GetStart from "../screens/GetStart";
import OnboardScreen from "../screens/OnboardingScreens/OnboardScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/authscreens/LoginScreen";
import SignUp from "../screens/authscreens/SignUp";
import Drawer from "./Drawer";

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

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator
      screenOptions={{ animation: "ios_from_right" }}
      initialRouteName={user ? "Home" : "OnboardScreen"}
    >
      {/* These screens hide header individually */}
      <Stack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStart"
        component={GetStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Drawer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={DetailsScreen}
        options={{
          headerShown: true,
          header: (props) => <AppHeader {...props} />,
        }}
      />
      {/* <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: "Checkout",
          headerShown: true,
          header: (props) => <AppHeader {...props} />,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackScreen;
