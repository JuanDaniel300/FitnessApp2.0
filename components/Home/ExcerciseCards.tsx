import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Clock, Activity } from "react-native-feather";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const ExerciseCard = ({ excercise }: { excercise: any }) => {
  return (
    <View className="w-full overflow-hidden rounded-xl mb-4">
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/excercise",
            params: { excercise: JSON.stringify(excercise) },
          });
        }}
      >
        <ImageBackground
          resizeMode="cover"
          className="h-36"
          source={{
            uri: excercise.IMAGEN,
          }}
        >
          <View
            className="relative h-full w-full "
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <Text className="font-signika text-white font-bold text-2xl absolute bottom-0 px-2 py-1">
              {excercise.NOMBRE}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const ExerciseCards = ({ exercises }: { exercises: any }) => {
  return (
    <View className="p-4">
      {exercises.map((value: any, index: number) => (
        <ExerciseCard key={index} excercise={value} />
      ))}
    </View>
  );
};

export default ExerciseCards;
