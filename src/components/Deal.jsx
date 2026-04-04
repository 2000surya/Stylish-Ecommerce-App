import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../constants/GlobalStyles";
import { toggleFav } from "../redux/slice/FavouriteSlice";
import { discountPrice } from "../utilis/DiscountPrice";
import Rating from "./Rating";

const DealCard = ({ item, index, total, hideRating, onPress }) => {
  const isCartItem = !!item?.products;
  const product = isCartItem ? item.products?.[0] : item;

  if (!product) return null;

  const originalPrice = product?.price ?? 0;
  const discountPercent = product?.discountPercentage ?? 0;

  const dispatch = useDispatch();

  // ✅ check if this product is in favourites
  const isFav = useSelector((state) =>
    state.favourite.favourites.some((f) => f.id === product.id)
  );

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
      onPress={() => onPress?.(product)}
    >
      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: product?.thumbnail || "https://via.placeholder.com/300",
          }}
          style={styles.imageStyle}
        />
      </View>

      {/* Discount Badge */}
      {discountPercent > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discountPercent}% OFF</Text>
        </View>
      )}

      {/* ✅ Heart Icon — top left, above image */}
      <Pressable
        style={styles.heartIcon}
        onPress={() => dispatch(toggleFav(product))}
      >
        <FontAwesome
          name={isFav ? "heart" : "heart-o"}
          size={20}
          color={isFav ? "red" : "#aaa"}
        />
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product?.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {product?.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.discountedPrice}>
            ₹ {discountPrice(originalPrice, discountPercent)}
          </Text>
          <Text style={styles.originalPrice}>₹ {originalPrice}</Text>
        </View>
        {!hideRating && <Rating rating={product?.rating} />}
      </View>
    </Pressable>
  );
};

const Deal = ({ data = [], hideRating = false, onPress }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item, index }) => (
          <DealCard
            item={item}
            index={index}
            total={data.length}
            hideRating={hideRating}
            onPress={onPress}
          />
        )}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30 }}
      />

      {/* Arrow */}
      <View style={styles.nextIconContainer}>
        <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
      </View>
    </View>
  );
};

export default Deal;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    borderRadius: 20,
    padding: 12,
    width: 300,
    backgroundColor: "#fff",
    ...GlobalStyles.shadowProperty,
  },
  pressed: {
    opacity: 0.85,
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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

  // ✅ Heart icon — top left corner over image
  heartIcon: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 6,
    borderRadius: 20,
    ...GlobalStyles.shadowProperty,
  },

  content: {
    marginTop: 10,
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  description: {
    fontSize: 13,
    color: "#777",
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  originalPrice: {
    fontSize: 14,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  nextIconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    ...GlobalStyles.shadowProperty,
  },
});
