import ScreenPlash from "@/components/screenPlash";
import LoadingPage from "@/components/splashScreen";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { typeUser } from "@/utils/generic";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Signika-Regular": require("../assets/fonts/Signika-Regular.ttf"),
  });
  const user = useAuthStore((state: any) => state.user);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    setIsLoader(true);

    setTimeout(() => {
      if (user) {
        if (user.perfil == typeUser.user) {
          router.replace("/home/home");
        } else if (user.perfil == typeUser.nutriologo) {
          router.replace("/nutriologo/home");
        }
      }
      setIsLoader(false);
    }, 2900);
  }, []);

  if (isLoader) {
    return <LoadingPage />;
  }

  const handlePressButton = () => {
    try {
      if (user) {
        if (user.perfil == typeUser.user) {
          router.replace("/home/home");
        } else if (user.perfil == typeUser.nutriologo) {
          router.replace("/nutriologo/home");
        }
      } else {
        router.replace("/start");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(1000).springify()}
      className="flex-1 justify-center items-center bg-white"
    >
      <Text className="mt-auto">
        <Text className="text-black font-bold text-4xl">Fitness</Text>
        <Text
          className="text-black font-bold text-4xl"
          style={{ color: Colors.light.textAccent }}
        >
          App
        </Text>
      </Text>
      <TouchableOpacity
        className="rounded-full px-32 py-4 mt-auto mb-16"
        style={{ backgroundColor: Colors.light.textAccent }}
        onPress={handlePressButton}
      >
        <Text className="text-xl text-white">Comenzar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default App;
