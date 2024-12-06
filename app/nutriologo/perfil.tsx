import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  ScrollView,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Image } from "react-native";
import { User } from "@/types/type";
import { capitalizeFirstLetter, profileMan } from "@/utils/generic";
import MenuScreen from "@/components/Home/MenuOptions";

const Profile = () => {
  const user: User = useAuthStore((state: any) => state.user);

  return (
    <SafeAreaView className="" style={styles.container}>
      {user ? (
        <ScrollView className="h-full w-full px-5">
          <Text className="text-black text-center text-lg mt-3 mb-8 font-signika">
            Perfil
          </Text>
          <View className="space-y-4">
            {/* Image */}
            <Image
              className="rounded-full flex items-center self-center align-middle m-auto border border-gray-300"
              width={130}
              height={130}
              source={{
                uri: profileMan,
              }}
            />

            {/* Username */}
            <View className="space-y-2">
              <Text className="text-center font-signika text-xl font-semibold">
                {user.name}
              </Text>
              <Text className="text-center font-signika text-lg text-gray-600">
                {capitalizeFirstLetter(user.edad)}
              </Text>
            </View>
          </View>

          {/* Options */}
          <View className="">
            <MenuScreen userType={user.perfil} />
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.infoText}>No has iniciado sesión.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 18,
  },
});

export default Profile;
