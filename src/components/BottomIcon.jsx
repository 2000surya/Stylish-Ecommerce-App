import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

const BottomIcon = ({ icon, name, size, focused, color }) => {
  let IconComponent;

  switch (icon) {
    case "Feather":
      IconComponent = Feather;
      break;
    case "Ionicons":
      IconComponent = Ionicons;
      break;
    case "AntDesign":
      IconComponent = AntDesign;
      break;
    default:
      IconComponent = Feather; // fallback
  }

  return (
    <IconComponent
      name={name}
      size={size}
      color={
        color !== undefined ? color : focused ? Colors.primary : Colors.black
      }
    />
  );
};

export default BottomIcon;
