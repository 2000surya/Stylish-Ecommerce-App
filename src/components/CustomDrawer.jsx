import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Colors } from "../constants/Colors";
import BottomIcon from "./BottomIcon";

const CustomDrawer = (props) => {
  // 🔥 Get active tab from nested navigator
  const getActiveRoute = (state) => {
    const route = state.routes[state.index];
    if (route.state) return getActiveRoute(route.state);
    return route.name;
  };

  const activeRoute = getActiveRoute(props.state);

  // 🔥 Reusable function
  const renderItem = (label, screen, iconName) => {
    const isActive = activeRoute === screen;

    return (
      <DrawerItem
        label={label}
        focused={isActive}
        labelStyle={{
          color: isActive ? Colors.primary : Colors.black,
          fontWeight: isActive ? "bold" : "normal",
        }}
        style={{
          backgroundColor: isActive ? "#f2f2f2" : "transparent",
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 4,
        }}
        onPress={() => {
          props.navigation.navigate("HomeTabs", {
            screen,
          });
          props.navigation.closeDrawer();
        }}
        icon={({ focused, size, color }) => (
          <BottomIcon name={iconName} size={size} focused={focused} />
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerContentScrollView {...props}>
        {renderItem("Home", "BottomHome", "home")}
        {renderItem("Wishlist", "WishList", "heart")}
        {renderItem("Shop", "BottomStack", "shopping-cart")}
        {renderItem("Search", "Search", "search")}
      </DrawerContentScrollView>

      {/* Bottom item */}
      <View style={{ marginBottom: 20 }}>
        {renderItem("Settings", "Settings", "settings")}
      </View>
    </View>
  );
};

export default CustomDrawer;
