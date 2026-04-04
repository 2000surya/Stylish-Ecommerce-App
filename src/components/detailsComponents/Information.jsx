import { StyleSheet, Text, View } from "react-native";

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};
export default InfoRow;
const styles = StyleSheet.create({
  infoLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
});
