import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHeader from "../../components/AuthHeader";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Footer from "../../components/Footer";
import { auth } from "../../config/firebase";
import { Colors } from "../../constants/Colors";
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [visible, setVisible] = useState(true);
  const [confrimVisible, setConfirmVisible] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [disable, setDisable] = useState(false);
  const passwordVisibility = () => {
    setVisible((pre) => !pre);
  };
  const confirmPasswordVisibility = () => {
    setConfirmVisible((pre) => !pre);
  };
  const emailHandler = (text) => {
    if (!text.includes("@")) {
      setEmailError("please enter correct email format");
    } else {
      setEmailError(""); // 👈 only clear when valid
    }
    setEmail(text);
  };

  const passwordHandler = (text) => {
    if (text.length < 6) {
      setPasswordError("must 6 charecter");
    } else {
      setPasswordError(""); // 👈 else add pannu
    }
    setPassword(text);
  };

  const confirmPasswordHandler = (text) => {
    setConfirmPassword(text);
    if (password !== text) {
      // 👈 text use pannu
      setConfirmPassError("password and confirm password not match");
    } else {
      setConfirmPassError("");
    }
  };

  const createAccountHandler = async () => {
    // Validation
    if (!email.trim()) {
      setEmailError("Please enter email");
      return;
    }
    if (!email.includes("@")) {
      setEmailError("Please enter valid email");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPassError("Passwords do not match");
      return;
    }
    setDisable(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      console.log(result);

      Toast.show({
        type: "success", // ✅ success
        text1: "Account Created!",
        text2: "Welcome aboard 🎉",
      });

      // navigation.replace("Home");
    } catch (error) {
      setDisable(false);

      switch (error.code) {
        case "auth/email-already-in-use":
          Toast.show({
            type: "error", // ❌ error
            text1: "Email Already Used",
            text2: "Try with different email",
          });
          break;
        case "auth/invalid-email":
          Toast.show({
            type: "error",
            text1: "Invalid Email",
            text2: "Please enter correct email format",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
      }
    }
  };
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <AuthHeader text={"Create an"} />
            <AuthHeader text={"Account"} />
          </View>

          {/* input */}

          <View style={{ marginBottom: 20 }}>
            <CustomInput
              value={email}
              onChange={emailHandler}
              placeHolderText={"Username or Email"}
              keyboard={"email-address"}
              error={emailError}
            />
            <CustomInput
              value={password}
              secure={visible}
              password={true}
              onChange={passwordHandler}
              visibility={passwordVisibility}
              placeHolderText={"Password"}
              hideForgot={true}
              error={passwordError}
            />
            <CustomInput
              value={confirmPassword}
              password={true}
              secure={confrimVisible}
              onChange={confirmPasswordHandler}
              visibility={confirmPasswordVisibility}
              placeHolderText={"ConfirmPassword "}
              hideForgot={true}
              error={confirmPassError}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ width: "70%", fontSize: FontSizes.xl }}>
              By clicking the{" "}
              <Text style={styles.registerText}> Register </Text>
              button you are agree to the public offer
            </Text>
          </View>

          <CustomButton
            text={"Create Account"}
            onPress={createAccountHandler}
            disable={disable}
          />

          <Footer pageName="Login" mainText="I Already Have an Account" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  registerText: {
    color: Colors.primary,
    fontSize: FontSizes.xl,
  },
});
