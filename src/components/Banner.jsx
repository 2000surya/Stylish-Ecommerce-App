import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    title: "Fashion Sale",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    title: "Women Fashion",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    title: "New Arrivals",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    title: "Summer Collection",
  },
];

const RenderItem = ({ item }) => (
  <View style={styles.bannerContainer}>
    <Image source={{ uri: item.image }} style={styles.imageStyle} />
  </View>
);

const Banner = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Dot indicators */}
      <View style={styles.dotContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  bannerContainer: {
    width: width,
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: 20,
    backgroundColor: "#E91E8C",
  },
});
