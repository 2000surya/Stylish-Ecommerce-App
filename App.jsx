import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import StackScreen from "./src/navigations/StackScreen";
import store from "./src/redux/Store";
const App = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
