import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from ".././constants/Colors";
import { FontSizes } from ".././constants/FontSize";

const AdCard = ({ title, subTitle, bg = "#4392f9" }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={[styles.container, { backgroundColor: bg }]}>
        <View style={styles.dealContainer}>
          <View>
            <Text style={styles.viewAllText}>{title ?? "Deal of the Day"}</Text>
            {/* timer */}
            <View style={styles.row}>
              <AntDesign name="clock-circle" size={15} color="white" />
              <Text style={styles.time}>
                {subTitle ?? "22h 55m 20s remaining"}
              </Text>
            </View>
          </View>

          {/* view all */}
          <Pressable
            style={[styles.row, styles.viewAllButton]}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.viewAllText}>View all</Text>
            <AntDesign name="arrow-right" size={15} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AdCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 15,
  },
  dealOuterContainer: {
    // flexDirection: "column",
  },
  dealContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  viewAllButton: {
    borderWidth: 2,
    borderColor: "white",
    padding: 4,
    borderRadius: 10,
  },
  viewAllText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    marginVertical: 5,
  },
  time: {
    fontSize: FontSizes.sm,
    color: Colors.white,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  shadow: {
    opacity: 0.9,
    // transform: [{ scale: 0.25 }],
  },
  imageWrapper: {
    overflow: "hidden",
    width: 300,
    height: 200,
    alignItems: "center",
  },

  title: {
    fontSize: FontSizes.md,
    color: Colors.black,
  },
});
