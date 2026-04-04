import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { toggleFav } from "../../redux/slice/FavouriteSlice";
import { discountPrice } from "../../utilis/DiscountPrice";

const WishList = () => {
  const dispatch = useDispatch();

  // ✅ Get all favourites from Redux
  const favourites = useSelector((state) => state.favourite.favourites);

  // ── Empty State ──
  if (favourites.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <FontAwesome name="heart-o" size={64} color="#ddd" />
        <Text style={styles.emptyTitle}>No Favourites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any product to save it here
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="heart" size={20} color="red" />
        <Text style={styles.headerTitle}>
          My Wishlist ({favourites.length})
        </Text>
      </View>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WishCard item={item} onRemove={() => dispatch(toggleFav(item))} />
        )}
      />
    </SafeAreaView>
  );
};

// ── Wish Card ──
const WishCard = ({ item, onRemove }) => {
  const originalPrice = item?.price ?? 0;
  const discountPercent = item?.discountPercentage ?? 0;

  return (
    <View style={styles.card}>
      {/* Image */}
      <Image
        source={{ uri: item?.thumbnail || "https://via.placeholder.com/150" }}
        style={styles.image}
      />

      {/* Details */}
      <View style={styles.details}>
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {item?.category ?? "Uncategorized"}
          </Text>
        </View>

        {/* Title */}
        <Text numberOfLines={2} style={styles.title}>
          {item?.title}
        </Text>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.discountedPrice}>
            ₹ {discountPrice(originalPrice, discountPercent)}
          </Text>
          <Text style={styles.originalPrice}>₹ {originalPrice}</Text>
        </View>

        {/* Rating */}
        <Rating rating={item?.rating} />
      </View>

      {/* ✅ Remove from Wishlist */}
      <Pressable style={styles.removeBtn} onPress={onRemove}>
        <FontAwesome name="heart" size={22} color="red" />
      </Pressable>
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f9f9f9",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    paddingHorizontal: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  listContent: {
    padding: 16,
    gap: 12,
  },

  // Card
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    gap: 12,
    ...GlobalStyles.shadowProperty,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#f5f5f5",
  },
  details: {
    flex: 1,
    gap: 4,
  },

  // Category
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#eaf4ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 11,
    color: "#3498db",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  // Price
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  originalPrice: {
    fontSize: 12,
    color: "#aaa",
    textDecorationLine: "line-through",
  },

  // Remove Button
  removeBtn: {
    padding: 8,
    alignSelf: "flex-start",
  },
});
