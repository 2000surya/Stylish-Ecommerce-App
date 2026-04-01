import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomDrawer from "../components/CustomDrawer";
import BottomTab from "./BottomTab";

const Drawer = () => {
  const DrawerNav = createDrawerNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <DrawerNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <DrawerNav.Screen name="HomeTabs" component={BottomTab} />
      </DrawerNav.Navigator>
    </SafeAreaView>
  );
};

export default Drawer;
