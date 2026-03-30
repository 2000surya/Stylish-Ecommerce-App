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
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
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
      <View style={styles.row}>
        {/* icon */}
        {password ? (
          <Fontisto name="locked" size={24} color="black" />
        ) : (
          <FontAwesome5 name="user" size={24} color="black" />
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType={"default" || keyboard}
          style={styles.inputStyle}
          placeholder={placeHolderText}
          secureTextEntry={password ? secure : false}
        />
        {password && (
          <TouchableOpacity onPress={visibility}>
            <Feather
              name={secure ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text>{error}</Text>
      {hideForgot ||
        (password && (
          <TouchableOpacity style={styles.fotgotButton} onPress={forgot}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.bg,
  },
  inputStyle: {
    flex: 1,
  },
  fotgotButton: {
    alignItems: "flex-end",
  },
  forgotText: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
  },
});
