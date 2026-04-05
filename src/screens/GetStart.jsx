import React, { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/commonComponents/CustomButton";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Images } from "../constants/Image";
import LoadingScreen from "../screens/LoadingScreen";
const GetStart = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle={"light-content"} />

      <ImageBackground
        source={Images.Start}
        style={styles.imageContainer}
        resizeMode="cover"
        onLoadEnd={() => setLoading(false)} // ✅ hide loader when loaded
      >
        {/* ✅ Loader */}
        {loading && <LoadingScreen />}

        <View style={styles.overlay}>
          <View style={styles.contentBelow}>
            <Text style={styles.titleStyle}>
              You want Authentic, here you go!
            </Text>
            <Text style={styles.smallText}>Find it here, buy it now!</Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              text="Get Started"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GetStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
    ...GlobalStyles.padding,
  },
  contentBelow: {
    alignItems: "center",
    paddingBottom: 50,
  },
  titleStyle: {
    fontSize: FontSizes.xxxxl,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    width: "80%",
  },
  smallText: {
    fontSize: FontSizes.xxl,
    color: Colors.white,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 40,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // prevents flicker
  },
});
