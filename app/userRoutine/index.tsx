import WorkoutRoutineScreen from "@/components/Home/Workout";
import API from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ArrowLeft, Navigation } from "react-native-feather";

const UserRoutine = () => {
  const navigation = useNavigation();
  const user: User = useAuthStore((state: any) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [listExcercises, setListExcercises] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Rutina de Ejercicio",
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
  }, [navigation]);

  useEffect(() => {
    fetchRoutineUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRoutineUser();
    setRefreshing(false);
  };

  const fetchRoutineUser = async () => {
    try {
      setListExcercises(null);
      const response = await API.post("?api=8", {
        usuario_id: user.id,
      });
      const res = response.data.response;

      setListExcercises(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (!listExcercises) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.light.textAccent} />
        <Text className="mt-2 text-gray-600 font-signika">
          Cargando categorías...
        </Text>
      </View>
    );
  }

  return (
    <>
      {listExcercises ? (
        <ScrollView
          className="flex-1 py-5"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <WorkoutRoutineScreen workoutData={listExcercises} />
        </ScrollView>
      ) : (
        ""
      )}
    </>
  );
};

export default UserRoutine;
