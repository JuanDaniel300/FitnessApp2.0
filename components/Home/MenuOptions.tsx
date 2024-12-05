import { useAuthStore } from "@/store/authStore";
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

export default function MenuScreen() {
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[styles.menuItem]}
            onPress={item.onPress}
          >
            <View style={styles.iconContainer}>
              <item.icon stroke="#F08080" width={24} height={24} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
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
    backgroundColor: "#fff",
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
