import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomIcon from "../components/BottomIcon";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSize";
import Home from "../screens/bottomTabs/Home";
import Search from "../screens/bottomTabs/Search";
import Settings from "../screens/bottomTabs/Settings";
import WishList from "../screens/bottomTabs/WishList";
import BottomStack from "./BottomStack";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        tabBarLabelStyle: {
          fontSize: FontSizes.sm,
        },
      }}
    >
      <Tab.Screen
        name="BottomHome"
        component={Home}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <BottomIcon focused={focused} size={size} name={"home"} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <BottomIcon name={"heart"} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="BottomStack"
        component={BottomStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View
              style={[
                styles.fabIcon,
                { backgroundColor: focused ? Colors.primary : Colors.white },
              ]}
            >
              <BottomIcon
                name={"shopping-cart"}
                size={size}
                icon={"AntDesign"}
                color={focused ? Colors.white : Colors.black} // ✅ FIXED
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <BottomIcon name={"search"} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <BottomIcon name={"settings"} size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  fabIcon: {
    position: "absolute",
    top: -20, // 🔥 move above tab bar
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
