import ExerciseCards from "@/components/Home/ExcerciseCards";
import API from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { ArrowLeft } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [categoryInfo, setCategoryInfo] = useState(null);
  const [excercises, SetExcercises] = useState([]);
  const [isLoanding, setIsLoanding] = useState(true);

  useEffect(() => {
    if (category) {
      setCategoryInfo(JSON.parse(category));
    }
  }, [category]);

  useEffect(() => {
    if (categoryInfo) {
      navigation.setOptions({
        headerTitle: categoryInfo.NOMBRE,
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

      fetchListExcercises();
    }
  }, [categoryInfo, navigation]);

  const fetchListExcercises = async () => {
    try {
      setIsLoanding(true);
      const response = await API.post("?api=3", {
        parte_cuerpo_id: categoryInfo.ID_PARTE_CUERPO,
      });
      const res = response.data.response;
      SetExcercises(res.data);
      setIsLoanding(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (isLoanding) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.light.textAccent} />
        <Text className="mt-2 text-gray-600 font-signika">
          Cargando categoría...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="h-full w-full bg-white">
      {excercises.length > 0 ? <ExerciseCards exercises={excercises} /> : ""}
    </ScrollView>
  );
};

export default CategoryScreen;
