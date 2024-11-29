import LottieView from "lottie-react-native";
import { View } from "react-native";

const LoadingPage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        style={{ height: "100%", width: "100%" }}
        source={require("../assets/loader2.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingPage;
