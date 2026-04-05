import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import CustomButton from "../../components/commonComponents/CustomButton";
import CustomInput from "../../components/commonComponents/CustomInput";
import { auth } from "../../config/firebase"; // adjust path
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";
const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [passValue, setPassValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [secure, setSecure] = useState(true);

  const [userNameError, setUserNameError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const userNameHandler = (text) => {
    setUserName(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!text.trim()) {
      setUserNameError("Email is required");
    } else if (!emailRegex.test(text)) {
      setUserNameError("Please enter valid email");
    } else {
      setUserNameError(""); // ✅ CLEAR ERROR
    }
  };

  const passwordHandler = (text) => {
    setPassValue(text);

    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleVisiblity = () => {
    setSecure((pre) => !pre);
  };

  const forgotPassword = () => {};

  const loginHandler = async () => {
    let valid = true;

    if (!userName.trim()) {
      setUserNameError("Email is required");
      valid = false;
    } else {
      setUserNameError("");
    }

    if (passValue.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;
    setDisable(true);
    try {
      await signInWithEmailAndPassword(auth, userName.trim(), passValue);
      console.log("Login success!");
      setDisable(true);
      navigation.replace("GetStart");
    } catch (error) {
      setDisable(false);
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          setUserNameError("No account found with this email");
          break;
        case "auth/wrong-password":
          setPasswordError("Incorrect password");
          break;
        case "auth/invalid-email":
          setUserNameError("Invalid email format");
          break;
        default:
          setUserNameError("Login failed. Try again.");
      }
    }
  };
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 25,
          paddingVertical: 20,
        }}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.container}>
          {/* header */}
          <View>
            <AuthHeader text={"Welcome"} />
            <AuthHeader text={"back !"} />
          </View>

          <View style={{ marginTop: 40 }}>
            {/* input field */}
            <CustomInput
              value={userName}
              onChange={userNameHandler}
              placeHolderText={"Username or Email"}
              password={false}
              error={userNameError}
            />

            <CustomInput
              value={passValue}
              onChange={passwordHandler}
              placeHolderText={"Password"}
              password={true}
              secure={secure}
              visibility={handleVisiblity}
              error={passwordError}
              forgot={forgotPassword}
            />
          </View>

          <CustomButton
            text={"Login"}
            onPress={loginHandler}
            disable={disable}
          />

          <Footer />
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
