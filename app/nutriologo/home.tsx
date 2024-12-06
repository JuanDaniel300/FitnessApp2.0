import API from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { User } from "./usuarios";
import { getNames, getNamesNutiologo } from "@/utils/generic";

// Componente para las tarjetas de estadísticas
const StatCard = ({
  icon,
  title,
  value,
  color,
}: {
  icon: any;
  title: any;
  value: any;
  color: any;
}) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Icon name={icon} size={30} color="#FFFFFF" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

// Componente para los elementos de la lista de usuarios recientes
const RecentUserItem = ({
  name,
  lastVisit,
  nextAppointment,
}: {
  name: any;
  lastVisit: any;
  nextAppointment: any;
}) => (
  <View style={styles.userItem}>
    <Icon name="account" size={40} color="#91C788" style={styles.userIcon} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userLastVisit}>Última visita: {lastVisit}</Text>
      <Text style={styles.userNextAppointment}>
        Próxima cita: {nextAppointment}
      </Text>
    </View>
    <TouchableOpacity style={styles.userActionButton}>
      <Icon name="chevron-right" size={24} color="#91C788" />
    </TouchableOpacity>
  </View>
);

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const user: User = useAuthStore((state: any) => state.user);

  // Datos de ejemplo
  const totalUsers = usersData.length;
  const activeUsers = usersData.length;
  const appointmentsToday = 8;
  const recentUsers = [
    {
      name: "María García",
      lastVisit: "15 May 2024",
      nextAppointment: "29 May 2024",
    },
    {
      name: "Juan Pérez",
      lastVisit: "14 May 2024",
      nextAppointment: "28 May 2024",
    },
    {
      name: "Ana Rodríguez",
      lastVisit: "13 May 2024",
      nextAppointment: "27 May 2024",
    },
  ];

  useEffect(() => {
    fecthUsersDara();
  }, [usersData]);

  const fecthUsersDara = async () => {
    try {
      const response = await API.post("?api=2", {
        usuario_id: null,
      });
      setUsersData(response.data.response.data);
    } catch (error) {}
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fecthUsersDara();
    setRefreshing(false);
  };

  return (
    <View
      className="flex-1 items-center h-full w-full pt-[80px] "
      style={styles.container}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full w-full px-5 pb-14"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.welcomeText}>
          Bienvenido, Dr. {getNamesNutiologo(user.name)}
        </Text>

        <View style={styles.statsContainer}>
          <StatCard
            icon="account-group"
            title="Total Usuarios"
            value={totalUsers}
            color="#91C788"
          />
          <StatCard
            icon="account-check"
            title="Usuarios Activos"
            value={activeUsers}
            color="#729e6b"
          />
          <StatCard
            icon="calendar-check"
            title="Citas Hoy"
            value={appointmentsToday}
            color="#91C788"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Usuarios Recientes</Text>
          {recentUsers.map((user, index) => (
            <RecentUserItem key={index} {...user} />
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>Ver todos los usuarios</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-16" style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/nutriologo/usuarios");
              }}
              style={styles.quickActionButton}
            >
              <Icon name="calendar-plus" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionButtonText}>Agregar Rutina</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => {
                router.navigate("/nutriologoActions/NuevoUsuario");
              }}
            >
              <Icon name="account-plus" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionButtonText}>Nuevo Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/nutriologo/consulta");
              }}
              style={styles.quickActionButton}
            >
              <Icon name="file-document-edit" size={24} color="#FFFFFF" />
              <Text style={styles.quickActionButtonText}>Nueva Consulta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFF",
  },
  scrollContent: {},
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },
  statTitle: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 15,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  userIcon: {
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
  },
  userLastVisit: {
    fontSize: 14,
    color: "#718096",
  },
  userNextAppointment: {
    fontSize: 14,
    color: "#718096",
  },
  userActionButton: {
    padding: 5,
  },
  viewAllButton: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  viewAllButtonText: {
    color: "#91C788",
    fontSize: 16,
    fontWeight: "bold",
  },
  quickActionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
  },
  quickActionsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    backgroundColor: "#91C788",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
});

export default Home;
