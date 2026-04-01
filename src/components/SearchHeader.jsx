import { EvilIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import { GlobalStyles } from "../constants/GlobalStyles";
import Banner from "./Banner";
import RenderCategory from "./RenderCatagory";

const SearchBar = ({ value, setValue, categories }) => {
  return (
    <View>
      <View style={[GlobalStyles.row, styles.searchContainer]}>
        <EvilIcons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search any Product.."
          value={value}
          onChangeText={(text) => setValue(text)}
          style={styles.inputStyle}
          placeholderTextColor={"gray"}
          returnKeyType="search"
        />
        <Feather name="mic" size={20} color="gray" />
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.allFeatureText}>All Featured</Text>
        <View style={styles.filterAndSortContainer}>
          <View style={styles.split}>
            <Text style={styles.normalText}>Sort</Text>
            <MaterialCommunityIcons name="sort" size={20} color="black" />
          </View>
          <View style={styles.split}>
            <Text style={styles.normalText}>Filter</Text>
            <Feather name="filter" size={20} color="black" />
          </View>
        </View>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RenderCategory item={item} index={index} total={categories.length} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Banner />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchContainer: {
    ...GlobalStyles.shadowProperty,
    padding: 8,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
  },
  featureContainer: {
    marginVertical: 20,
    ...GlobalStyles.row,
    marginHorizontal: 15,
  },
  allFeatureText: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.black,
  },
  filterAndSortContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  split: {
    ...GlobalStyles.shadowProperty,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  normalText: {
    fontSize: FontSizes.sm,
    color: Colors.black,
  },
});
