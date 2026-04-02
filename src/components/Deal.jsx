import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";
import Rating from "./Rating";

const DealCard = ({ item, index, total }) => {
  // ✅ Cart data-a? Products array la irukku — first product எடு
  // ✅ Product data-a? Direct-a use பண்ணு
  const isCartItem = !!item?.products; // products array irundha = cart item

  const product = isCartItem ? item.products[1] : item;

  // ✅ Discount price calculate
  const originalPrice = product?.price ?? 0;
  const discountPercent = product?.discountPercentage ?? 0;
  const discountedPrice = (
    originalPrice -
    (originalPrice * discountPercent) / 100
  ).toFixed(2);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        {
          marginStart: 20,
          marginEnd: index === total - 1 ? 10 : 0,
        },
      ]}
    >
      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product?.thumbnail }} style={styles.imageStyle} />
      </View>

      {/* Discount Badge */}
      {discountPercent > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discountPercent}% OFF</Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {product?.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {product?.description}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          {/* Discounted Price — big */}
          <Text style={styles.discountedPrice}>₹ {discountedPrice}</Text>

          {/* Original Price — strikethrough */}
          <Text style={styles.originalPrice}>₹ {originalPrice}</Text>
        </View>

        {/* Rating */}
        <Rating rating={product?.rating} />
      </View>
    </Pressable>
  );
};

const Deal = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <DealCard item={item} index={index} total={data.length} />
        )}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30 }}
      />

      {/* Forward Arrow */}
      <View style={styles.nextIconContainer}>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
      </View>
    </View>
  );
};

export default Deal;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    ...GlobalStyles.shadowProperty,
    borderRadius: 20,
    padding: 10,
    width: 300,
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrapper: {
    overflow: "hidden",
    width: "100%",
    height: 200,
    borderRadius: 14,
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  // ✅ Discount badge — top right corner
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },

  content: {
    marginTop: 10,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  description: {
    fontSize: 12,
    color: "#888",
    lineHeight: 18,
  },

  // ✅ Price row
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71", // green — offer price
  },
  originalPrice: {
    fontSize: 13,
    color: "#aaa",
    textDecorationLine: "line-through", // ✅ strikethrough
  },

  nextIconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    ...GlobalStyles.shadowProperty,
  },
});
