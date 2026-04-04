import { EvilIcons, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const InputSearch = ({ value, setValue, catagories, editable = true }) => {
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
          editable={editable}
        />
        <Feather name="mic" size={20} color="gray" />
      </View>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  searchContainer: {
    ...GlobalStyles.shadowProperty,
    padding: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  inputStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});
