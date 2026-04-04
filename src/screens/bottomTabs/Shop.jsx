import { Ionicons } from "@expo/vector-icons";
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
import CustomButton from "../../components/commonComponents/CustomButton";
import { Colors } from "../../constants/Colors";
import { FontSizes } from "../../constants/FontSize";
import { GlobalStyles } from "../../constants/GlobalStyles";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slice/CartSlice";

const Shop = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ Total price calculate
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🛒 Cart is Empty</Text>
        <Text style={styles.emptySubText}>Add items from the product page</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Image */}
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            {/* Details */}
            <View style={styles.details}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>₹ {item.price}</Text>

              {/* Quantity Controls */}
              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => dispatch(decreaseQuantity(item.id))}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </Pressable>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => dispatch(increaseQuantity(item.id))}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Remove */}
            <Pressable
              style={styles.removeBtn}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Ionicons name="trash-outline" size={20} color="#e74c3c" />
            </Pressable>
          </View>
        )}
      />

      {/* Total + Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹ {totalPrice.toFixed(2)}</Text>
        </View>
        <CustomButton
          text="Checkout"
          onPress={() => {
            navigation.navigate("PaymentScreen", { totalPrice });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Shop;
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  emptyText: { fontSize: FontSizes.xl, fontWeight: "bold", color: "#333" },
  emptySubText: { fontSize: FontSizes.md, color: "#aaa" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: "bold", color: "#000" },
  listContent: { padding: 16, gap: 12 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#f5f5f5",
  },
  details: { flex: 1, gap: 4 },
  title: { fontSize: FontSizes.lg, fontWeight: "bold", color: "#000" },
  price: { fontSize: FontSizes.lg, fontWeight: "bold", color: "#2ecc71" },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#eaf4ff",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { fontSize: FontSizes.xl, color: "#3498db", fontWeight: "bold" },
  qtyText: { fontSize: FontSizes.lg, fontWeight: "bold", color: "#000" },
  removeBtn: { padding: 6, alignSelf: "flex-start" },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 16, fontWeight: "bold", color: "#000" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#2ecc71" },
});
