import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import AppHeader from "../components/commonComponents/AppHeader";
import PaymentScreen from "../screens/PaymentScreen";
import Shop from "../screens/bottomTabs/Shop";

const BottomStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ animation: "ios_from_right" }}
      initialRouteName="Shop"
    >
      <Stack.Screen
        component={Shop}
        name="Shop"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={PaymentScreen}
        name="PaymentScreen"
        options={{
          title: "Checkout",
          header: (props) => <AppHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomStack;

const styles = StyleSheet.create({});
