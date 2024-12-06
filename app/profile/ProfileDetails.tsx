import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import { profileMan } from "@/utils/generic";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

const ProfileDetails = () => {
  const user: User = useAuthStore((state: any) => state.user);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={{ uri: profileMan }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.age}>{user.edad}</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoItem icon="user" label="Nombre completo" value={user.name} />
          <InfoItem
            icon="mail"
            label="Correo electrónico"
            value={user?.email}
          />
          <InfoItem
            icon="phone"
            label="Teléfono"
            value={"+52 " + user.telefono}
          />
          <InfoItem
            icon="map-pin"
            label="Dirección"
            value="Calle Principal 123, Ciudad, Estado"
          />
          <InfoItem
            icon="calendar"
            label="Fecha de nacimiento"
            value={user.fecha_nacimiento}
          />
        </View>

        <View className="hidden" style={styles.bioSection}>
          <Text style={styles.bioTitle}>Información adicional</Text>
          <Text style={styles.bioText}>
            Estudiante de ingeniería en sistemas computacionales. Apasionado por
            la tecnología y el desarrollo de software.
          </Text>
        </View>

        <TouchableOpacity onPress={handleBack} style={styles.editButton}>
          <Icon name="edit-2" size={20} color="#fff" />
          <Text className="" style={styles.editButtonText}>
            Regresar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: any;
  value: any;
}) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={20} color="#4a5568" style={styles.icon} />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
  },
  age: {
    fontSize: 16,
    color: "#718096",
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  icon: {
    marginRight: 10,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#718096",
  },
  infoValue: {
    fontSize: 16,
    color: "#2d3748",
  },
  bioSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: "#4a5568",
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: Colors.dark.textAccent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileDetails;
