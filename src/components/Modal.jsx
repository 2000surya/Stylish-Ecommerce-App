import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

const PaymentSuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.circle}>
              <Text style={styles.tick}>✓</Text>
            </View>
          </View>

          {/* Text */}
          <Text style={styles.text}>Payment done successfully.</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // 🔥 important
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },

  iconContainer: {
    marginBottom: 15,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff3b5c",
    justifyContent: "center",
    alignItems: "center",
  },

  tick: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
