import { Dimensions } from "react-native";

import { Colors } from "./Colors";
const { width, height } = Dimensions.get("window");
export const GlobalStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  padding: {
    paddingHorizontal: 20,
  },
  shadowProperty: {
    elevation: 5, // reduce
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // smaller shadow
    shadowOpacity: 0.1, // very light
    shadowRadius: 2,
    backgroundColor: "white",
  },
  size: { width, height },
};
