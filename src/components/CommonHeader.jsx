import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Splash from "../../assets/images/splash.png";
import { Images } from "../constants/Image";
const CommonHeader = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer(); // ✅ opens drawer
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={openDrawer}
        style={({ pressed }) => [
          styles.normalbtn,
          pressed && styles.btnOpacity,
        ]}
      >
        <AntDesign name="align-left" size={24} color="black" />
      </Pressable>
      <Image source={Splash} style={styles.imageStyle} />
      <Pressable
        style={({ pressed }) => [
          styles.normalbtn,
          pressed && styles.btnOpacity,
        ]}
      >
        <Image source={Images.profile} style={styles.profileImage} />
      </Pressable>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  imageStyle: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  btnOpacity: {
    backgroundColor: "rgba(0,0,0,0.3)",
    opacity: 0.6,
    padding: 5,
    borderRadius: 50,
  },
  normalbtn: {
    padding: 5,
  },
  profileImage: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});
