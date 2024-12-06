import API from "@/constants/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type User = {
  id: number;
  name: string;
  email: string;
};

const Consulta = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);

  // Datos de ejemplo de usuarios
  const users: User[] = [
    { id: 1, name: "María García", email: "maria@example.com" },
    { id: 2, name: "Juan Pérez", email: "juan@example.com" },
    { id: 3, name: "Ana Rodríguez", email: "ana@example.com" },
    { id: 4, name: "Carlos Sánchez", email: "carlos@example.com" },
    { id: 5, name: "Laura Martínez", email: "laura@example.com" },
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

  const filteredUsers = usersData?.filter((user) =>
    user?.NOMBRE.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => {
        router.push({
          pathname: "/nutriologoActions/NuevaConsulta",
          params: {
            userDataNavigation: JSON.stringify({
              id: item.ID_USUARIO,
              nombre: item.NOMBRE,
            }),
          },
        });
      }}
    >
      <Icon name="account" size={24} color="#91C788" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.NOMBRE}</Text>
        <Text style={styles.userEmail}>{item.USUARIO}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#91C788" />
    </TouchableOpacity>
  );

  return (
    <View className="pt-[50px]" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seleccionar Usuario</Text>
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => item.ID_USUARIO.toString()}
        style={styles.userList}
      />
      <TouchableOpacity
        style={styles.newUserButton}
        onPress={() => {
          router.navigate("/nutriologoActions/NuevoUsuario");
        }}
      >
        <Icon name="account-plus" size={24} color="#FFFFFF" />
        <Text style={styles.newUserButtonText}>Crear Nuevo Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
  },
  userEmail: {
    fontSize: 14,
    color: "#718096",
  },
  newUserButton: {
    backgroundColor: "#91C788",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  newUserButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Consulta;
