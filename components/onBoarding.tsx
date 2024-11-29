import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import { slides } from "@/utils/slides";
import AppIntroSlider from "react-native-app-intro-slider";
import { DoneButton, NextButton } from "./nextButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [isAuth, setAuth] = useState<boolean>(false);
  const size = useSharedValue(1200);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      size.value = withTiming(60, { duration: 1500 });
      positionX.value = withTiming(width - 200, { duration: 1500 });
      positionY.value = withTiming(height - 200, { duration: 1500 });
    }, 500);

    setTimeout(() => {
      setIsAnimated(false);
    }, 2000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      backgroundColor: "transparent",
      borderRadius: size.value / 2,
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const handleDoneSlider = () => {
    if (!isAuth) {
      router.replace("/login");
    }
  };

  if (isAnimated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: Colors.light.textAccent,
              position: "absolute",
            },
          ]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: size.value / 2,
              backgroundColor: Colors.light.textAccent,
            }}
          ></TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <AppIntroSlider
      data={slides}
      activeDotStyle={{
        backgroundColor: Colors.light.textAccent,
        width: 30,
      }}
      renderNextButton={NextButton}
      renderDoneButton={DoneButton}
      onDone={handleDoneSlider}
      renderItem={({ item }) => {
        return (
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className=" flex-1 justify-center items-center self-center w-full h-full"
          >
            <Text
              className=" font-bold text-center"
              style={{ fontSize: 28, color: Colors.light.textAccentBlack }}
            >
              FitnessApp
            </Text>
            <LottieView
              style={{ width: width - 80, height: 400 }}
              source={item.image}
              autoPlay
              loop
            />

            <Text
              className=" font-bold text-center text-gray-900"
              style={{ fontSize: 28 }}
            >
              {item.title}
            </Text>
            <Text className="text-gray-500 pt-5 text-center px-16">
              {item.description}
            </Text>
          </Animated.View>
        );
      }}
    />
  );
};

export default OnBoarding;
