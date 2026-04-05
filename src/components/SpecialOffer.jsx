import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import { Images } from "../constants/Image";
import AdCard from "./AdCard";
import Deal from "./Deal";

const SpecialOffer = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
          {/* image */}
          <View style={styles.ImageContainer}>
            <Image source={Images.num3} style={styles.imageStyle} />
          </View>
          {/* text */}
          <View style={styles.textContainer}>
            <Text>Special Offers</Text>

            <Text numberOfLines={4}>
              We make sure you get the offer you need at best prices
            </Text>
          </View>
        </View>
      </View>

      {/* ff9aaa  */}
      {/* trending  products*/}

      <AdCard
        title={"Trending  Products"}
        subTitle={"Last Date 29/04/26"}
        bg={"#ff9aaa"}
      />

      <Deal data={data} hideRating={true} />
    </View>
  );
};

export default SpecialOffer;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 40,
  },
  ImageContainer: {
    overflow: "hidden",
    width: 80,
    height: 80,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  textContainer: {
    flex: 1,
  },
  specialOfferText: {
    fontSize: FontSizes.md,
    color: Colors.black,
  },
});
