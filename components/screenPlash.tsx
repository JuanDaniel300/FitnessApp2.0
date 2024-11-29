import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";

const ScreenPlash = () => {
  return (
    <Animated.View
      entering={ZoomIn.duration(1000).springify()}
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: Colors.light.textAccent }}
    >
      <Text className="text-white font-bold text-4xl">FitnessApp</Text>
    </Animated.View>
  );
};

export default ScreenPlash;
