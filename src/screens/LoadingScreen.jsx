import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
