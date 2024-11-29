import Categories from "@/components/Home/Categories";
import Routine from "@/components/Home/Routines";
import SliderBanner from "@/components/Home/SliderBanner";
import API from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import { capitalizeFirstLetter, getNames, profileMan } from "@/utils/generic";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const IndexHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const user: User = useAuthStore((state: any) => state.user);
  const userName = getNames(user.name);

  const fetchCategories = async () => {
    try {
      setCategories([]);
      const response = await API.get("?api=6");
      const res = response.data.response;
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white">
      <LinearGradient
        className="relative"
        colors={["#91c788", "#a6d39a", "transparent"]}
        style={styles.gradient}
      />
      <ScrollView
        className="h-full space-y-7 relative z-50"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* User Info */}
        <View className="flex-row h-max  justify-between items-center self-center align-middle mx-5 mt-5 mb-10">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white font-signika">
              Bienvenido
            </Text>
            <Text
              className="font-bold font-signika text-white"
              style={{ fontSize: 28 }}
            >
              {userName}
            </Text>
          </View>

          {/* Imagen */}
          <Image
            className="rounded-full border border-gray-400 flex items-center self-center align-middle m-auto"
            width={60}
            height={60}
            source={{
              uri: profileMan,
            }}
          />
        </View>

        {/* Banner */}
        <View className="mx-5">
          <SliderBanner />
        </View>

        {/* Routines */}
        <View className="mx-5">
          <Routine />
        </View>

        {/* Categories */}
        <View className="">
          <Categories categories={categories} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400, // Altura del gradiente
    zIndex: 1, // Asegura que esté encima del contenido
  },
  scrollContent: {
    paddingTop: 120, // Desplaza el contenido para que no quede debajo del gradiente
  },
  text: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
});
