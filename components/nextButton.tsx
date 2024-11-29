import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export const NextButton = () => {
  return (
    <View
      className="rounded-full p-4"
      style={{ backgroundColor: Colors.light.backgroundSecond }}
    >
      <Text className=" text-white font-semibold">
        <Ionicons name="arrow-forward" size={15} />
      </Text>
    </View>
  );
};

export const DoneButton = () => {
  return (
    <View
      className="rounded-full p-4"
      style={{ backgroundColor: Colors.light.backgroundSecond }}
    >
      <Text className=" text-white font-semibold">
        <Ionicons name="checkmark" size={15} />
      </Text>
    </View>
  );
};
