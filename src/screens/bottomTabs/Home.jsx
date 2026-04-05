import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../../api/api";
import AdCard from "../../components/AdCard";
import Deal from "../../components/Deal";
import SearchBar from "../../components/SearchHeader";
import SpecialOffer from "../../components/SpecialOffer";
import CommonHeader from "../../components/commonComponents/CommonHeader";
import { GlobalStyles } from "../../constants/GlobalStyles";
import LoadingScreen from "../LoadingScreen";

// ✅ Outside component — categories never changes so no need inside
const categories = [
  {
    id: "1",
    title: "Men Fashion",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
  },
  {
    id: "2",
    title: "Women Fashion",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    id: "3",
    title: "Beauty Products",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    id: "4",
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  },
  {
    id: "5",
    title: "Watches",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
  },
  {
    id: "6",
    title: "Handbags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  },
  {
    id: "7",
    title: "Jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
  },
  {
    id: "8",
    title: "Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },
  {
    id: "9",
    title: "Perfumes",
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8",
  },
  {
    id: "10",
    title: "Skincare",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
  },
  {
    id: "11",
    title: "Hair Care",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    id: "12",
    title: "Kids Fashion",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
  },
];

const Home = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefresh(true);
      } else {
        setLoading(true);
      }
      const [productRes, cartRes] = await Promise.all([
        getData("products"),
        getData("carts"),
      ]);
      setProducts(productRes.products);
      setCards(cartRes.carts);
    } catch (error) {
      console.log("fetchAll error:", error);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={[1]}
          keyExtractor={(item) => item.toString()}
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          renderItem={null}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => fetchAll(true)}
            />
          }
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={GlobalStyles.padding}>
                <CommonHeader />
              </View>

              {/* Search + Categories */}

              <SearchBar
                value={value}
                setValue={setValue}
                categories={categories}
                navigation={navigation}
                editable={false}
              />

              {/* Banner Ad */}
              <AdCard />

              {/* Deal Products */}
              <Deal
                data={products}
                onPress={(item) => {
                  navigation.navigate("ProductDetails", { item });
                }}
                navigation={navigation}
              />

              {/* Special Offers */}
              <SpecialOffer data={cards} />
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
});
