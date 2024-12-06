import API from "@/constants/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export type User = {
  id: number;
  name: string;
  edad?: number | any;
  email?: string;
  photo?: string;
  telefono?: string;
  fecha_nacimiento?: string;
  peso?: number;
  estautra?: number;
  genero?: string;
};

// Componente para una tarjeta de usuario=>
const UserCard = ({ user, onPress }: { user: any; onPress: () => void }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      router.push({
        pathname: "/nutriologoActions/AgregarRutina",
        params: {
          userDataNavigation: JSON.stringify({
            id: user?.ID_USUARIO,
            nombre: user?.NOMBRE,
          }),
        },
      });
    }}
  >
    <View style={styles.cardHeader}>
      {user.photo ? (
        <Image source={{ uri: user.photo }} style={styles.userPhoto} />
      ) : (
        <Icon name="account-circle" size={60} color="#91C788" />
      )}
      <View style={styles.cardHeaderText}>
        <Text style={styles.userName}>{user.NOMBRE}</Text>
        {user.EDAD && <Text style={styles.userAge}>{user.EDAD}</Text>}
        {user.USUARIO && <Text style={styles.userEmail}>{user.USUARIO}</Text>}
      </View>
    </View>
    <View style={styles.cardContent}>
      {user.TELEFONO && (
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#729e6b" />
          <Text style={styles.infoText}>{user.TELEFONO}</Text>
        </View>
      )}
      {user.FECHA_NACIMIENTO && (
        <View style={styles.infoRow}>
          <Icon name="cake-variant" size={20} color="#729e6b" />
          <Text style={styles.infoText}>{user.FECHA_NACIMIENTO}</Text>
        </View>
      )}
      {(user.PESO || user.ALTURA) && (
        <View style={styles.infoRow}>
          <Icon name="human-male-height" size={20} color="#729e6b" />
          <Text style={styles.infoText}>
            {user.PESO && `${user.PESO} kg`}
            {user.PESO && user.PESO && " - "}
            {user.ALTURA && `${user.ALTURA} cm`}
          </Text>
        </View>
      )}
      {user.SEXO && (
        <View style={styles.infoRow}>
          <Icon name="gender-male-female" size={20} color="#729e6b" />
          <Text style={styles.infoText}>{user.SEXO}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const Usuarios = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);

  // Datos de ejemplo de usuarios
  const users: User[] = [
    {
      id: 1,
      name: "María García",
      edad: 35,
      email: "maria@example.com",
      telefono: "123-456-7890",
      fecha_nacimiento: "1989-05-15",
      peso: 65,
      estautra: 165,
      genero: "Femenino",
    },
    {
      id: 2,
      name: "Juan Pérez",
      edad: 42,
      email: "juan@example.com",
      telefono: "098-765-4321",
      fecha_nacimiento: "1982-09-23",
      peso: 80,
      estautra: 178,
      genero: "Masculino",
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      edad: 28,
      email: "ana@example.com",
      telefono: "456-789-0123",
      fecha_nacimiento: "1996-12-10",
      peso: 58,
      estautra: 160,
      genero: "Femenino",
    },
    {
      id: 4,
      name: "Carlos Sánchez",
      edad: 50,
      email: "carlos@example.com",
      telefono: "789-012-3456",
      fecha_nacimiento: "1974-03-30",
      peso: 75,
      estautra: 172,
      genero: "Masculino",
    },
    {
      id: 5,
      name: "Laura Martínez",
      edad: 31,
      email: "laura@example.com",
      telefono: "234-567-8901",
      fecha_nacimiento: "1993-07-18",
      peso: 62,
      estautra: 168,
      genero: "Femenino",
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

  const filteredUsers = usersData.filter((user) =>
    user?.NOMBRE.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserPress = (userId: number) => {
    console.log(`Usuario seleccionado: ${userId}`);
  };

  return (
    <View className="pt-10 h-full  bg-white">
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        <View style={styles.searchBar}>
          <Icon
            name="magnify"
            size={24}
            color="#91C788"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuario..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full w-full pb-52"
        contentContainerStyle={styles.scrollContent}
      >
        {filteredUsers.map((user) => (
          <UserCard
            key={user?.ID_USUARIO}
            user={user}
            onPress={() => handleUserPress(user?.ID_USUARIO)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDF2F7",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#4A5568",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
  userAge: {
    fontSize: 14,
    color: "#718096",
  },
  userEmail: {
    fontSize: 14,
    color: "#4A5568",
  },
  cardContent: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#4A5568",
  },
});

export default Usuarios;
