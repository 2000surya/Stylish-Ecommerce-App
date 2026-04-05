import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { FontSizes } from "../../constants/FontSize";

const CustomInput = ({
  value,
  onChange,
  placeHolderText,
  secure,
  password,
  visibility,
  error,
  forgot,
  keyboard,
  hideForgot = false,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[styles.row, error ? styles.errorBorder : null]}>
        {/* icon */}
        {password ? (
          <Fontisto name="locked" size={20} color="#555" />
        ) : (
          <FontAwesome5 name="user" size={20} color="#555" />
        )}

        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType={keyboard || "default"}
          style={styles.inputStyle}
          placeholder={placeHolderText}
          secureTextEntry={password ? secure : false}
          autoCapitalize="none"
          placeholderTextColor={Colors.gray}
        />

        {password && (
          <TouchableOpacity onPress={visibility}>
            <Feather name={secure ? "eye" : "eye-off"} size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Forgot Password */}
      {/* {!hideForgot && password && (
        <TouchableOpacity style={styles.fotgotButton} onPress={forgot}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.bg,
  },

  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  // 🔥 Error styles
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },

  errorBorder: {
    borderColor: "#e74c3c",
  },

  fotgotButton: {
    alignItems: "flex-end",
    marginTop: 5,
  },

  forgotText: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
  },
});
