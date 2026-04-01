import AntDesign from "@expo/vector-icons/AntDesign";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import { GlobalStyles } from "../constants/GlobalStyles";
import Rating from "./Rating";

const DealCard = ({ item, index, total }) => (
  <Pressable
    style={({ pressed }) => [
      styles.card,
      pressed && styles.shadow,

      {
        marginStart: 20,
        marginEnd: index === total - 1 ? 10 : 0,
      },
    ]}
  >
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.thumbnail }} style={styles.imageStyle} />
    </View>
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <View>
        <Text numberOfLines={4}>{item.description}</Text>
      </View>
      <Text>₹ {item.price}</Text>
      <Text>{item.discountPercentage}</Text>
      <Rating rating={item.rating} />
    </View>
  </Pressable>
);

const Deal = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dealContainer}>
          <View>
            <Text style={styles.viewAllText}>Deal of the Day</Text>
            {/* timer */}
            <View style={styles.row}>
              <AntDesign name="clock-circle" size={15} color="white" />
              <Text style={styles.time}>22h 55m 20s remaining</Text>
            </View>
          </View>

          {/* view all */}
          <View style={[styles.row, styles.viewAllButton]}>
            <Text style={styles.viewAllText}>View all</Text>
            <AntDesign name="arrow-right" size={15} color="white" />
          </View>
        </View>
      </View>
      {/* first */}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <DealCard item={item} index={index} total={data.length} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30 }}
      />
    </View>
  );
};
export default Deal;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: "#4392f9",
    borderRadius: 15,
    padding: 15,
  },
  dealOuterContainer: {
    // flexDirection: "column",
  },
  dealContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  viewAllButton: {
    borderWidth: 2,
    borderColor: "white",
    padding: 4,
    borderRadius: 10,
  },
  viewAllText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    marginVertical: 5,
  },
  time: {
    fontSize: FontSizes.sm,
    color: Colors.white,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  shadow: {
    opacity: 0.9,
    transform: [{ scale: 0.9 }],
  },
  imageWrapper: {
    overflow: "hidden",
    width: 300,
    height: 200,
    alignItems: "center",
  },
  card: {
    marginVertical: 20,
    ...GlobalStyles.shadowProperty,
    borderRadius: 20,
    padding: 10,
    width: 300,
  },
  title: {
    fontSize: FontSizes.md,
    color: Colors.black,
  },
});
