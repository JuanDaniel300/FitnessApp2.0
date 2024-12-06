import { useAuthStore } from "@/store/authStore";
import { typeUser } from "@/utils/generic";
import { Navigator, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  User,
  Star,
  Settings,
  FileText,
  LogOut,
  ChevronRight,
} from "react-native-feather";

export default function MenuScreen({ userType = 1 }: { userType: number }) {
  const logout = useAuthStore((state: any) => state.logout);

  const menuItems = [
    {
      title: "Perfil",
      icon: User,
      onPress: () => {
        router.navigate("/profile/ProfileDetails");
      },
    },
    {
      title: "Planes",
      icon: Star,
      onPress: () => {
        router.navigate("/profile/Plans");
      },
    },
    {
      title: "Terminos & Politica de Privacidad",
      icon: FileText,
      onPress: () => console.log("Terms pressed"),
    },
    {
      title: "Salir",
      icon: LogOut,
      onPress: () => handleLogout(),
    },
  ];

  const menuNutriolog = [
    {
      title: "Perfil",
      icon: User,
      onPress: () => {
        router.navigate("/profile/ProfileDetails");
      },
    },
    {
      title: "Terminos & Politica de Privacidad",
      icon: FileText,
      onPress: () => console.log("Terms pressed"),
    },
    {
      title: "Salir",
      icon: LogOut,
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        onPress: () => {
          logout();
          router.replace("/login");
        },
      },
    ]);
  };

  const profileMenu =
    userType == typeUser.nutriologo ? menuNutriolog : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {profileMenu.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem]}
            onPress={item.onPress}
          >
            <View style={styles.iconContainer}>
              <item.icon stroke="#F08080" width={24} height={24} />
            </View>
            <Text className="" style={styles.menuText}>
              {item.title}
            </Text>
            <ChevronRight stroke="#CCCCCC" width={24} height={24} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
});
