import { StyleSheet, Text, View } from "react-native";
import { FontSizes } from "../constants/FontSize";

const AuthHeader = ({ text }) => {
  return (
    <View>
      <Text style={styles.welcomeText}>{text}</Text>
    </View>
  );
};
export default AuthHeader;
const styles = StyleSheet.create({
  welcomeText: {
    fontWeight: "bold",
    fontSize: FontSizes.xxxxxl,
  },
});
