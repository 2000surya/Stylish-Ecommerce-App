import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const GlobalStyles = {
  container: {
    flex: 1,
    backgroundColor: "white",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  size: { width, height },
};
