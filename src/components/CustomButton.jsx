import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";

const CustomButton = ({ text, onPress, disable }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
      disabled={disable}
    >
      {disable ? (
        <ActivityIndicator size={"small"} color={"white"} /> // 👈 outside Text
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: FontSizes.xl,
  },
});
