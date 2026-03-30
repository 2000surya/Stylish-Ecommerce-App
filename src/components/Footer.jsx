import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import { Images } from "../constants/Image";

const Footer = ({ pageName = "Sign Up", mainText = "Create An Account" }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.socialLoginContainer}>
        <Text style={styles.create}>- OR Continue with</Text>

        <Pressable
          style={({ pressed }) => [
            styles.socialLoginStyle,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Image source={Images.google} style={styles.image} />
        </Pressable>

        <Text style={styles.create}>
          {mainText}{" "}
          <Text
            style={styles.singUpText}
            onPress={() => navigation.navigate("SignUp")}
          >
            {pageName}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  socialLoginContainer: {
    marginVertical: 40,
    alignItems: "center",
    gap: 20,
  },
  socialLoginStyle: {
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  create: {
    fontSize: FontSizes.xl,
    fontWeight: "900",
  },
  singUpText: {
    color: Colors.primary,
    textDecorationStyle: "dashed",
    textDecorationLine: "underline",
    fontSize: FontSizes.xl,
  },
});
