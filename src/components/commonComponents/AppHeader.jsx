import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSizes } from "../../constants/FontSize";

const AppHeader = ({ navigation, route, options }) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.title}>{options?.title ?? route?.name}</Text>

        <View style={styles.placeholder} />
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 15,
  },
  backBtn: {
    width: 34,
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    textAlign: "center",
  },

  placeholder: {
    width: 36,
  },
});
