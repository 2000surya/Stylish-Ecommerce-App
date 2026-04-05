import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import CustomButton from "../../components/commonComponents/CustomButton";
import CustomInput from "../../components/commonComponents/CustomInput";
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
      setEmailError("");
    }
    setEmail(text);
  };

  const passwordHandler = (text) => {
    if (text.length < 6) {
      setPasswordError("must 6 charecter");
    } else {
      setPasswordError("");
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
    let valid = true;

    if (!email.trim()) {
      setEmailError("Please enter email");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email");
      valid = false;
    }

    if (password.length < 6) {
      setPasswordError("Must be at least 6 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPassError("Passwords do not match");
      valid = false;
    }

    if (!valid) return; // ✅ stop here safely

    setDisable(true); // ✅ ONLY after validation

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      Toast.show({
        type: "success",
        text1: "Account Created!",
        text2: "Welcome aboard 🎉",
      });

      navigation.replace("GetStart");
    } catch (error) {
      setDisable(false);

      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("Email already used");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid email");
          break;
        default:
          Toast.show({
            type: "error",
            text1: "Something went wrong",
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

          <Footer
            pageName="Login"
            mainText="I Already Have an Account"
            screen="LoginScreen"
          />
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
