import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import StackScreen from "./src/navigations/StackScreen";

const App = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackScreen />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
