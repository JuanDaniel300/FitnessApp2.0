import { router } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutCard = ({ routine, parte }: { routine: any; parte: any }) => (
  <TouchableOpacity
    onPress={() => {
      router.push({
        pathname: "/excercise",
        params: {
          excercise: JSON.stringify({ ...routine, PARTE_CUERPO: parte }),
        },
      });
    }}
    className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
  >
    <Image
      source={{ uri: routine.IMAGEN }}
      className="w-full h-48"
      resizeMode="cover"
    />
    <View className="p-4">
      <Text className="text-lg font-bold text-gray-800 font-signika mb-1">
        {routine.NOMBRE}
      </Text>
      <Text className="text-sm text-blue-600 mb-2 font-signika">
        ⏱ {routine.TIEMPO}
      </Text>
      <Text className="text-gray-600 text-sm font-signika">
        {routine.DESCRIPCION}
      </Text>
    </View>
  </TouchableOpacity>
);

const BodyPartSection = ({ bodyPart }: { bodyPart: any }) => {
  const content = JSON.parse(bodyPart[0]);
  return (
    <View className="mb-6">
      <Text className="text-xl font-bold font-signika mb-4 text-gray-800 px-4">
        {content.PARTE_CUERPO}
      </Text>
      {content.RUTINAS.map((routine: any, index: number) => (
        <View key={index} className="px-4">
          <WorkoutCard routine={routine} parte={content.PARTE_CUERPO} />
        </View>
      ))}
    </View>
  );
};

export default function WorkoutRoutineScreen({
  workoutData,
}: {
  workoutData: any;
}) {
  return (
    <View className="">
      <Text className="text-2xl font-bold font-signika text-center text-gray-900 mb-6">
        Tu Rutina de Ejercicios
      </Text>
      {workoutData.map((bodyPart: any, index: number) => (
        <BodyPartSection key={index} bodyPart={bodyPart} />
      ))}
    </View>
  );
}
