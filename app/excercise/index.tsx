import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ArrowLeft } from "react-native-feather";

const Excercise = () => {
  const navigation = useNavigation();
  const { excercise } = useLocalSearchParams();

  const [excerciseDetails, setExcercisesDetails] = useState([]);

  useEffect(() => {
    if (excercise) {
      setExcercisesDetails(JSON.parse(excercise));
    }
  }, [excercise]);

  useEffect(() => {
    if (excerciseDetails) {
      navigation.setOptions({
        headerTitle: excerciseDetails.NOMBRE,
        headerBackTitleVisible: true,
        headerStyle: {
          backgroundColor: Colors.light.textAccentBlack,
        },
        headerTintColor: "white",
        headerLeft: () => (
          <Text
            onPress={() => {
              navigation.goBack();
            }}
            style={{ paddingLeft: 10, color: "white" }}
          >
            <ArrowLeft color="white" />
          </Text>
        ),
      });
    }
  }, [excerciseDetails, navigation]);

  return (
    <ScrollView className="h-full w-full bg-white">
      <Image
        className="overflow-auto shadow"
        height={350}
        source={{ uri: excerciseDetails.IMAGEN }}
        resizeMode="cover"
      />
      <View className=" p-0 m-0 h-[1px] bg-gray-300" />

      <Text className="font-semibold text-2xl px-5 py-3 font-signika">
        {excerciseDetails.NOMBRE}
      </Text>

      <View className=" p-0 m-0 h-[1px] bg-gray-300" />

      <View className="px-5 py-2 h-full w-full ">
        <Text className="font-signika mt-4 text-xl text-green-700">
          Descripcion:
        </Text>
        <Text className="font-signika font-normal text-lg">
          {excerciseDetails.DESCRIPCION}
        </Text>

        <Text className="font-signika mt-4 text-xl text-green-700">
          Tiempo de ejecución:
        </Text>
        <Text className="text-lg font-signika ">
          {excerciseDetails.TIEMPO} Minutos
        </Text>

        <Text className="font-signika mt-4 text-xl text-green-700">
          Zona a trabajar:
        </Text>
        <Text className="text-lg font-signika ">
          {excerciseDetails.PARTE_CUERPO}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Excercise;
