import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

const Rating = ({ rating }) => {
  const totalStars = 5;

  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;

        return (
          <FontAwesome
            key={index}
            name={
              rating >= starNumber
                ? "star" // full star
                : rating >= starNumber - 0.5
                ? "star-half" // you can replace with half-star lib if needed
                : "star-half" // empty star
            }
            size={16}
            color="#FFD700" // gold color
            style={{ marginRight: 2 }}
          />
        );
      })}
    </View>
  );
};

export default Rating;
