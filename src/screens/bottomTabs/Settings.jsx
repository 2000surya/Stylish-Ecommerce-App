import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/commonComponents/CustomButton";
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { Images } from "../../constants/Image";
const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setEmail(user.email); // ✅ Firebase email
    }
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.padding]}>
      <StatusBar barStyle="dark-content" />

      <View style={[GlobalStyles.container, styles.container]}>
        <View style={styles.profileContainer}>
          <Image source={Images.profile} />
        </View>
        {/* Heading */}
        <Text style={styles.heading}>Personal Details</Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false} // 🔒 read-only
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter your address"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        {/* Button */}
        <View style={{ marginTop: 25 }}>
          <CustomButton text="Save Changes" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  heading: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },

  label: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    fontSize: FontSizes.md,
    backgroundColor: "#f9f9f9",
  },

  disabledInput: {
    backgroundColor: "#eaeaea",
    color: "#888",
  },
});
