import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import PaymentSuccessModal from "../components/Modal";
import CustomButton from "../components/commonComponents/CustomButton";
import { GlobalStyles } from "../constants/GlobalStyles";

// ── Payment Summary Row ──
const PaymentDetails = ({ label, price, isTotal }) => (
  <View style={[styles.row, isTotal && styles.totalRow]}>
    <Text style={[styles.label, isTotal && styles.totalLabel]}>{label}</Text>
    <Text style={[styles.price, isTotal && styles.totalPrice]}>₹ {price}</Text>
  </View>
);

//                       ── Payment Method Card ──
const PaymentMethodCard = ({
  id,
  icon,
  title,
  subtitle,
  selected,
  onSelect,
}) => (
  <Pressable
    style={[styles.methodCard, selected === id && styles.methodCardSelected]}
    onPress={() => onSelect(id)}
  >
    <View style={styles.methodLeft}>
      <View
        style={[
          styles.methodIcon,
          selected === id && styles.methodIconSelected,
        ]}
      >
        {icon}
      </View>
      <View>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <View style={[styles.radio, selected === id && styles.radioSelected]}>
      {selected === id && <View style={styles.radioDot} />}
    </View>
  </Pressable>
);

const PaymentScreen = ({ navigation, route }) => {
  const { totalPrice } = route?.params ?? {};
  const shippingPrice = 50;
  const grandTotal = totalPrice + shippingPrice;
  const [isVisible, setIsVisible] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const modalOpen = useCallback(() => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }], // 👈 change to your home screen name
      });
    }, 2000);
  }, [navigation]);
  const modalClose = useCallback(() => {
    return setIsVisible(false);
  }, []);

  // ── Format card number with spaces ──
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <KeyboardAwareScrollView
        style={GlobalStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps={"handled"}
      >
        <PaymentSuccessModal visible={isVisible} onClose={modalClose} />
        <View style={{ paddingHorizontal: 16, marginVertical: 15 }}>
          {/* ── Order Summary ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <PaymentDetails label="Subtotal" price={totalPrice} />
            <PaymentDetails label="Shipping" price={shippingPrice} />
            <View style={styles.divider} />
            <PaymentDetails label="Total" price={grandTotal} isTotal />
          </View>

          {/* ── Payment Method ── */}
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <PaymentMethodCard
            id="card"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            icon={
              <Ionicons
                name="card-outline"
                size={22}
                color={selectedMethod === "card" ? "#3498db" : "#888"}
              />
            }
            title="Credit / Debit Card"
            subtitle="Visa, Mastercard, Rupay"
          />

          {/* <PaymentMethodCard
            id="paypal"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            icon={
              <AntDesign
                name="creditcard"
                size={22}
                color={selectedMethod === "paypal" ? "#3498db" : "#888"}
              />
            }
            title="PayPal"
            subtitle="Pay via PayPal account"
          /> */}

          <PaymentMethodCard
            id="upi"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            icon={
              <Ionicons
                name="phone-portrait-outline"
                size={22}
                color={selectedMethod === "upi" ? "#3498db" : "#888"}
              />
            }
            title="UPI"
            subtitle="GPay, PhonePe, Paytm"
          />

          <PaymentMethodCard
            id="cod"
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            icon={
              <Ionicons
                name="cash-outline"
                size={22}
                color={selectedMethod === "cod" ? "#3498db" : "#888"}
              />
            }
            title="Cash on Delivery"
            subtitle="Pay when you receive"
          />

          {/* ── Card Form ── */}
          {selectedMethod === "card" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Card Details</Text>

              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              />

              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name on card"
                value={cardName}
                onChangeText={setCardName}
              />

              <View style={styles.rowInputs}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    value={expiry}
                    onChangeText={setExpiry}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="•••"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    value={cvv}
                    onChangeText={setCvv}
                  />
                </View>
              </View>

              {/* Secure Badge */}
              <View style={styles.secureBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#2ecc71" />
                <Text style={styles.secureText}>
                  Your payment is 256-bit SSL secured
                </Text>
              </View>
            </View>
          )}

          {/* ── PayPal Form ── */}
          {selectedMethod === "paypal" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PayPal</Text>
              <Text style={styles.inputLabel}>PayPal Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@paypal.com"
                keyboardType="email-address"
              />
              <View style={styles.secureBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#2ecc71" />
                <Text style={styles.secureText}>
                  You'll be redirected to PayPal to complete payment
                </Text>
              </View>
            </View>
          )}

          {/* ── UPI Form ── */}
          {selectedMethod === "upi" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>UPI Payment</Text>
              <Text style={styles.inputLabel}>UPI ID</Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@upi"
                value={upiId}
                onChangeText={setUpiId}
              />

              {/* UPI Apps */}
              <Text style={[styles.inputLabel, { marginTop: 10 }]}>
                Or pay via
              </Text>
              <View style={styles.upiApps}>
                {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                  <View key={app} style={styles.upiApp}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={20}
                      color="#3498db"
                    />
                    <Text style={styles.upiAppText}>{app}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ── COD Info ── */}
          {selectedMethod === "cod" && (
            <View style={styles.section}>
              <View style={styles.codInfo}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#f39c12"
                />
                <Text style={styles.codText}>
                  Pay ₹ {grandTotal} in cash when your order is delivered. Extra
                  ₹10 COD charge may apply.
                </Text>
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {/* ── Pay Button ── */}
      <View style={styles.footer}>
        <CustomButton text={`Pay ₹ ${grandTotal}`} onPress={modalOpen} />
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  // Section
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },

  // Summary
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  totalRow: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  price: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },

  // Payment Method Card
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#eee",
    elevation: 1,
  },
  methodCardSelected: {
    borderColor: "#3498db",
    backgroundColor: "#f0f8ff",
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  methodIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  methodIconSelected: {
    backgroundColor: "#dbeeff",
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  methodSubtitle: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
  },

  // Radio Button
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#3498db",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
  },

  // Inputs
  inputLabel: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },

  // Secure Badge
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
    backgroundColor: "#f0fff4",
    padding: 10,
    borderRadius: 10,
  },
  secureText: {
    fontSize: 12,
    color: "#2ecc71",
    fontWeight: "500",
    flex: 1,
  },

  // UPI
  upiApps: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 8,
  },
  upiApp: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf4ff",
    borderRadius: 12,
    padding: 12,
    gap: 4,
    width: 70,
  },
  upiAppText: {
    fontSize: 11,
    color: "#3498db",
    fontWeight: "600",
  },

  // COD
  codInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#fffbf0",
    padding: 12,
    borderRadius: 10,
  },
  codText: {
    fontSize: 13,
    color: "#888",
    lineHeight: 20,
    flex: 1,
  },

  // Footer
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 10,
  },
});
