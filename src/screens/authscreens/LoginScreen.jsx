import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";

const LoginScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome </Text>
          <Text style={styles.welcomeText}>Back! </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: FontSizes.xxxxl,
  },
});
