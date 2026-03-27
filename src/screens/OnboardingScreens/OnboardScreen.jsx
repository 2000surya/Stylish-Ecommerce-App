import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors.jsx";
import { FontSizes } from "../../constants/FontSize.jsx";
import { GlobalStyles } from "../../constants/GlobalStyles.jsx";
import { Images } from "../../constants/Image.jsx";

const OnboardScreen = ({ navigation }) => {
  const { width } = Dimensions.get("window");

  const data = [
    {
      count: 1,
      image: Images.num1,
      text: "Choose product",
      subText:
        "Browse through our catalog and pick your favorite items quickly and easily.",
    },
    {
      count: 2,
      image: Images.num2,
      text: "Make Payment",
      subText:
        "Pay securely using your preferred payment method in just a few clicks.",
    },
    {
      count: 3,
      image: Images.num3,
      text: "Get Your Order",
      subText:
        "Sit back and relax — we deliver your order safely to your doorstep.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Detect current visible item
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Render each onboarding page
  const renderItem = ({ item }) => (
    <View style={[{ width }, styles.scrollContainer]}>
      {/* Header */}
      <View style={GlobalStyles.row}>
        <Text style={styles.textStyle}>
          {item.count}
          <Text style={{ color: Colors.gray, fontSize: FontSizes.md }}>
            /{data.length}
          </Text>
        </Text>
        <Pressable onPress={() => console.log("Skip pressed")}>
          <Text style={styles.textStyle}>Skip</Text>
        </Pressable>
      </View>

      {/* Image & Text */}
      <View style={styles.center}>
        <Image source={item.image} style={styles.imageStyle} />
        <Text style={styles.titleText}>{item.text}</Text>
        <Text style={styles.subText} numberOfLines={3} ellipsizeMode="tail">
          {item.subText}
        </Text>
      </View>
    </View>
  );

  // Navigate to next screen
  const goNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  // Navigate to previous screen
  const goPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Onboarding FlatList */}
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.count.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Indicators + Navigation */}
      <View style={styles.indicatorWrapper}>
        {/* Center Indicators */}
        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorStyle,
                index === currentIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <Pressable style={styles.prevButton} onPress={goPrev}>
            <Text style={styles.navText}>Previous</Text>
          </Pressable>
        )}

        {/* Next / Get Started Button */}
        <Pressable style={styles.nextButton} onPress={goNext}>
          <Text style={styles.navText}>
            {currentIndex === data.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    flex: 1,
  },
  textStyle: {
    fontSize: FontSizes.md,
    color: Colors.black,
    fontWeight: "bold",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginVertical: 20,
  },
  titleText: {
    fontSize: FontSizes.xxxl,
    color: Colors.black,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  subText: {
    fontSize: FontSizes.xl,
    color: Colors.black,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "200",
  },
  indicatorWrapper: {
    position: "relative",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  indicatorStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: "transparent",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    width: 30,
  },
  nextButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  prevButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  navText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
