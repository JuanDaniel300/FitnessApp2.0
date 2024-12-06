import { Tabs } from "expo-router";
import { Icon } from "react-native-vector-icons/Icon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Text as DefaultText, View, StyleSheet } from "react-native";

const HomeLayout = () => {
  const [fontsLoaded] = useFonts({
    "Signika-Regular": require("../../assets/fonts/Signika-Regular.ttf"),
  });

  DefaultText.defaultProps = DefaultText.defaultProps || {};
  DefaultText.defaultProps.style = [{ fontFamily: "Signika-Regular" }];

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors.light.icon,
        tabBarActiveTintColor: Colors.dark.textAccent,
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="home" />
          ),
        }}
      />

      {/* Lista de Usuario */}
      <Tabs.Screen
        name="usuarios"
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
        }}
      />

      {/* Consulta */}
      <Tabs.Screen
        name="consulta"
        options={{
          title: "Consulta",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="plus" color={color} />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="address-book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
