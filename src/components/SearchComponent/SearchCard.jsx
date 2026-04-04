import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/Colors";
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { toggleFav } from "../../redux/slice/FavouriteSlice";
import { discountPrice } from "../../utilis/DiscountPrice";
import Rating from "../Rating";

const SearchCard = ({ item, onPress }) => {
  const details = item || {};
  const originalPrice = details.price ?? 0;
  const discountPercent = details.discountPercentage ?? 0;

  const dispatch = useDispatch();

  // ✅ check if this item is already in favourites
  const isFav = useSelector((state) =>
    state.favourite.favourites.some((f) => f.id === details.id)
  );

  const handleFav = (e) => {
    e.stopPropagation?.(); // ✅ prevent card onPress from firing
    dispatch(toggleFav(details));
  };

  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.container}>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: details.thumbnail || "https://via.placeholder.com/150",
            }}
            style={styles.imageStyle}
          />
        </View>

        {/* ✅ Heart Icon — toggles fav */}
        <Pressable style={styles.heartIcon} onPress={handleFav}>
          <FontAwesome
            name={isFav ? "heart" : "heart-o"} // ✅ filled vs outline
            size={22}
            color={isFav ? "red" : "#aaa"} // ✅ red if fav, grey if not
          />
        </Pressable>

        {/* Title */}
        <Text numberOfLines={2} style={styles.titleStyle}>
          {details.title}
        </Text>

        {/* Description */}
        <Text numberOfLines={3} style={styles.description}>
          {details.description}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.discountedPrice}>
            ₹ {discountPrice(originalPrice, discountPercent)}
          </Text>
          <Text style={styles.originalPrice}>₹ {originalPrice}</Text>
        </View>

        {/* Rating */}
        <Rating rating={details.rating} />
      </View>
    </Pressable>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    ...GlobalStyles.shadowProperty,
  },
  heartIcon: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 25,
  },

  imageWrapper: {
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },

  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  titleStyle: {
    fontSize: FontSizes.lg || 18,
    color: Colors.black || "#000",
    fontWeight: "bold",
    marginTop: 8,
  },

  description: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },

  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ecc71",
  },

  originalPrice: {
    fontSize: 14,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
});

// ✅ Discount function
