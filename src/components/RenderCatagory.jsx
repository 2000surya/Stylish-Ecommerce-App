import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";

const RenderCategory = ({ item, index, total }) => (
  <Pressable
    style={[
      styles.productContainer,
      index === 0 && { marginLeft: 15 },
      index === total - 1 && { marginRight: 15 },
    ]}
  >
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <Text style={styles.categoryTitle} numberOfLines={1}>
      {item.title}
    </Text>
  </Pressable>
);
export default RenderCategory;

const styles = StyleSheet.create({
  productContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  productImage: {
    height: 70,
    width: 70,
    resizeMode: "cover",
    borderRadius: 35,
  },
  categoryTitle: {
    fontSize: FontSizes.sm,
    marginTop: 5,
    color: Colors.black,
    textAlign: "center",
    width: 70,
  },
});
