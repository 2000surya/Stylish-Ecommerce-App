import { Image, StyleSheet, View } from "react-native";
import { Images } from "../constants/Image";
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.logo} />
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
