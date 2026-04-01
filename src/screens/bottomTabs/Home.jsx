import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProduct } from "../../api/api";
import CommonHeader from "../../components/CommonHeader";
import Deal from "../../components/Deal";
import SearchBar from "../../components/SearchHeader";
import { GlobalStyles } from "../../constants/GlobalStyles";
import LoadingScreen from "../LoadingScreen";
const Home = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    product();
  }, []);
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

  const product = async () => {
    try {
      setLoading(true);
      const response = await getProduct("products");
      setProducts(response.products);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // 👇 Later API call pannும்போது products state varum

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />

      <View style={styles.container}>
        <View style={GlobalStyles.padding}>
          <CommonHeader />
        </View>
        {loading ? (
          <LoadingScreen />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={null}
            ListHeaderComponent={
              <>
                <SearchBar
                  value={value}
                  setValue={setValue}
                  categories={categories}
                />
                <Deal data={products} />
              </>
            }
            ListEmptyComponent={null} // 👈 add empty state UI later
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
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
