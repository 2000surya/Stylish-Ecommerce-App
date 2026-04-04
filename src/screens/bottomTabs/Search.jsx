import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getData } from "../../api/api";
import InputSearch from "../../components/InputSearch";
import SearchCard from "../../components/SearchComponent/SearchCard";
import { Colors } from "../../constants/Colors";
import { GlobalStyles } from "../../constants/GlobalStyles";
import LoadingScreen from "../LoadingScreen";

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState(""); // ✅ better naming
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefresh(true) : setLoading(true);

      const res = await getData("products");
      setData(res?.products || []);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }, []);

  // 🔥 Safe filtering
  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  return (
    <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
      <View style={styles.container}>
        {/* 🔍 Search */}
        <View style={{ marginVertical: 10 }}>
          <InputSearch value={searchText} setValue={setSearchText} editable />
        </View>

        {/* 🔄 Loading */}
        {loading ? (
          <LoadingScreen />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => fetchData(true)}
                colors={[Colors.primary]}
              />
            }
            numColumns={2}
            renderItem={({ item }) => (
              <SearchCard
                item={item}
                onPress={() => navigation.navigate("ProductDetails", { item })}
              />
            )}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 20 }}
            // 🔥 Better Empty UI
            ListEmptyComponent={
              <View style={styles.emptyContent}>
                <Text style={styles.emptyText}>
                  {searchText
                    ? `No results found for "${searchText}"`
                    : "No Products Available"}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
    gap: 15,
  },

  emptyContent: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
  },
});
