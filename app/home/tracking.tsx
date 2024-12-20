import API from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Tipo para una visita al nutriólogo
type NutritionistVisit = {
  date: string;
  weight: number;
  bmi: number;
  bodyFatPercentage: number;
  notes: string;
};

// Componente para una tarjeta de visita
const VisitCard = ({ visit }: { visit: NutritionistVisit }) => (
  <View className="border border-gray-200" style={styles.card}>
    <View style={styles.cardHeader}>
      <Text className="font-signika" style={styles.cardDate}>
        {visit?.FECHA}
      </Text>
      <Icon name="calendar" size={24} color="#91C788" />
    </View>
    <View style={styles.cardContent}>
      <View style={styles.metricRow}>
        <View style={styles.metric}>
          <Icon name="weight-kilogram" size={24} color="#729e6b" />
          <Text className="font-signika" style={styles.metricValue}>
            {visit?.PESO} kg
          </Text>
          <Text className="font-signika" style={styles.metricLabel}>
            Peso
          </Text>
        </View>
        <View style={styles.metric}>
          <Icon name="human-male-height" size={24} color="#729e6b" />
          <Text className="font-signika" style={styles.metricValue}>
            {visit?.ESTATURA}
          </Text>
          <Text className="font-signika" style={styles.metricLabel}>
            cm
          </Text>
        </View>
        <View style={styles.metric}>
          <Icon name="percent" size={24} color="#729e6b" />
          <Text className="font-signika" style={styles.metricValue}>
            {visit?.IMC}
          </Text>
          <Text className="font-signika" style={styles.metricLabel}>
            IMC
          </Text>
        </View>
      </View>
      <Text className="font-signika" style={styles.notes}>
        {visit?.RECOMENDACIONES}
      </Text>
    </View>
  </View>
);

const Tracking = () => {
  const user: User = useAuthStore((state: any) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState([]);
  const visits: NutritionistVisit[] = [
    {
      date: "15 de Mayo, 2024",
      weight: 72,
      bmi: 23.5,
      bodyFatPercentage: 18,
      notes: "Buena progresión. Mantener el plan actual.",
    },
    {
      date: "1 de Mayo, 2024",
      weight: 73,
      bmi: 23.8,
      bodyFatPercentage: 19,
      notes: "Ligero aumento de peso. Ajustar ingesta calórica.",
    },
    {
      date: "15 de Abril, 2024",
      weight: 75,
      bmi: 24.5,
      bodyFatPercentage: 20,
      notes: "Inicio del plan. Establecer metas de pérdida de peso.",
    },
    {
      date: "15 de Abril, 2024",
      weight: 75,
      bmi: 24.5,
      bodyFatPercentage: 20,
      notes: "Inicio del plan. Establecer metas de pérdida de peso.",
    },
    {
      date: "15 de Abril, 2024",
      weight: 75,
      bmi: 24.5,
      bodyFatPercentage: 20,
      notes: "Inicio del plan. Establecer metas de pérdida de peso.",
    },
  ];

  useEffect(() => {
    fecthHistory();
  }, [history]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fecthHistory();
    setRefreshing(false);
  };

  const fecthHistory = async () => {
    try {
      const response = await API.post("?api=10", {
        visualizar: 1,
        usuario_id: user.id,
      });
      const info = response.data.response.data;

      info.sort((a, b) => b.ID_OBSERVACION - a.ID_OBSERVACION);

      setHistory(info);
    } catch (error) {
      console.error(error);
    }
  };

  if (history.length <= 0) {
    return (
      <View className="flex items-center justify-center h-full w-full">
        <Text>Cargando</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 h-full w-full items-center bg-white pt-16">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="w-full px-5"
        contentContainerStyle={styles.scrollContent}
      >
        <Text className="font-signika" style={styles.title}>
          Seguimiento de Progreso
        </Text>
        {history.map((visit, index) => (
          <VisitCard key={index} visit={visit} />
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
  scrollContent: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 20,
    textAlign: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
  cardContent: {
    marginTop: 10,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  metric: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: "#718096",
  },
  notes: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#91C788",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Tracking;
