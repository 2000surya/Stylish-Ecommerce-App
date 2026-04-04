import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/commonComponents/CustomButton";
import InfoRow from "../components/detailsComponents/Information";
import { FontSizes } from "../constants/FontSize";
import { GlobalStyles } from "../constants/GlobalStyles";
import { addToCart } from "../redux/slice/CartSlice";
import { toggleFav } from "../redux/slice/FavouriteSlice";
import { discountPrice } from "../utilis/DiscountPrice";

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route?.params ?? {};
  const details = item || {};
  const originalPrice = details.price ?? 0;
  const discountPercent = details.discountPercentage ?? 0;
  const dispatch = useDispatch();

  const isInCart = useSelector((state) =>
    state.cart.cartItems.some((c) => c.id === details.id)
  );
  const isFav = useSelector((state) =>
    state.favourite.favourites.some((f) => f.id === details.id)
  );

  const handleFav = (e) => {
    e.stopPropagation?.(); // ✅ prevent card onPress from firing
    dispatch(toggleFav(details));
  };

  return (
    <SafeAreaView style={GlobalStyles.container} edges={["bottom"]}>
      <ScrollView
        style={GlobalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: details.thumbnail }} style={styles.image} />

        <Pressable style={styles.heartIcon} onPress={handleFav}>
          <FontAwesome
            name={isFav ? "heart" : "heart-o"} // ✅ filled vs outline
            size={22}
            color={isFav ? "red" : "#aaa"} // ✅ red if fav, grey if not
          />
        </Pressable>
        <View style={styles.content}>
          <View style={styles.catagoryAndTag}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {details.category ?? "Uncategorized"}
              </Text>
            </View>
            {details.tags?.length > 0 && (
              <View style={styles.tags}>
                <AntDesign name="tags" size={16} color="#3498db" />
                <Text style={styles.tagsText}>{details.tags.join(", ")}</Text>
              </View>
            )}
          </View>
          <Text style={styles.title}>{details.title}</Text>
          {details.brand && (
            <Text style={styles.brand}>Brand: {details.brand}</Text>
          )}
          <View style={styles.row}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#f39c12" />
              <Text style={styles.ratingText}>{details.rating}</Text>
            </View>
            <View style={styles.stockBox}>
              <Ionicons
                name={details.stock > 0 ? "checkmark-circle" : "close-circle"}
                size={16}
                color={details.stock > 0 ? "#2ecc71" : "#e74c3c"}
              />
              <Text
                style={[
                  styles.stockText,
                  { color: details.stock > 0 ? "#2ecc71" : "#e74c3c" },
                ]}
              >
                {details.stock > 0
                  ? `${details.stock} In Stock`
                  : "Out of Stock"}
              </Text>
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.discountedPrice}>
              ₹ {discountPrice(originalPrice, discountPercent)}
            </Text>
            <Text style={styles.originalPrice}>₹ {originalPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>
                {discountPercent}% OFF
              </Text>
            </View>
          </View>
          <SectionCard title="Description">
            <Text style={styles.description}>{details.description}</Text>
          </SectionCard>
          <SectionCard title="Product Info">
            <InfoRow label="Category" value={details.category} />
            <InfoRow label="Brand" value={details.brand} />
            <InfoRow label="SKU" value={details.sku} />
            <InfoRow
              label="Weight"
              value={details.weight ? `${details.weight}g` : null}
            />
            <InfoRow
              label="Dimensions"
              value={
                details.dimensions
                  ? `${details.dimensions.width} x ${details.dimensions.height} x ${details.dimensions.depth} cm`
                  : null
              }
            />
          </SectionCard>
          <SectionCard title="Shipping Info">
            <InfoRow label="Shipping" value={details.shippingInformation} />
            <InfoRow label="Delivery" value={details.deliveryInformation} />
            <InfoRow label="Availability" value={details.availabilityStatus} />
          </SectionCard>
          <SectionCard title="Return Policy">
            <View style={styles.returnRow}>
              <Ionicons
                name="refresh-circle-outline"
                size={20}
                color="#3498db"
              />
              <Text style={styles.returnText}>
                {details.returnPolicy ?? "No return policy available"}
              </Text>
            </View>
          </SectionCard>
          <SectionCard title="Warranty">
            <View style={styles.returnRow}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#2ecc71"
              />
              <Text style={styles.returnText}>
                {details.warrantyInformation ?? "No warranty information"}
              </Text>
            </View>
          </SectionCard>
          {details.reviews?.length > 0 && (
            <SectionCard title={`Reviews (${details.reviews.length})`}>
              {details.reviews.map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Ionicons
                      name="person-circle-outline"
                      size={20}
                      color="#888"
                    />
                    <Text style={styles.reviewerName}>
                      {review.reviewerName}
                    </Text>
                    <View style={styles.reviewRating}>
                      <Ionicons name="star" size={12} color="#f39c12" />
                      <Text style={styles.reviewRatingText}>
                        {review.rating}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  <Text style={styles.reviewDate}>
                    {new Date(review.date).toDateString()}
                  </Text>
                </View>
              ))}
            </SectionCard>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {/* <CustomButton
          text={"Add Cart"}
          onPress={() =>
            navigation.navigate("Home", {
              screen: "HomeTabs",
              params: { screen: "Shop", params: { item } },
            })
          }
        /> */}
        <CustomButton
          text={isInCart ? "✓ Added to Cart" : "Add to Cart"}
          onPress={() => {
            dispatch(addToCart(details));
            navigation.navigate("Home", {
              screen: "HomeTabs",
              params: { screen: "BottomStack" },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const SectionCard = ({ title, children }) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default DetailsScreen;

const styles = StyleSheet.create({
  // ✅ SafeAreaView style

  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  heartIcon: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 25,
    ...GlobalStyles.shadowProperty,
    padding: 5,
    borderRadius: 20,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#eaf4ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#3498db",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  catagoryAndTag: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff8e1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#f39c12",
    fontWeight: "bold",
  },
  stockBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
  },
  tagsText: {
    fontSize: FontSizes.md,
    color: "#3498db",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  originalPrice: {
    fontSize: 16,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: "#fdecea",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountBadgeText: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  infoLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  returnRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  returnText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    flex: 1,
  },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  reviewRatingText: {
    fontSize: 12,
    color: "#f39c12",
  },
  reviewComment: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  reviewDate: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 4,
  },
});
