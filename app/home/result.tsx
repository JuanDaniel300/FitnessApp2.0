import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Result = () => {
  const [refreshing, setRefreshing] = useState(false);
  const user: User = useAuthStore((state: any) => state.user);
  const userResults = {
    name: user.name,
    weight: 75, // en kg
    height: 175, // en cm
    bmi: 22,
    caloriesGoal: 2200,
    observations:
      "El paciente muestra una buena progresión en su plan de nutrición. Se recomienda aumentar la ingesta de proteínas.",
    recommendations: [
      "Aumentar el consumo de agua a 2.5 litros diarios",
      "Incluir más vegetales verdes en la dieta",
      "Reducir el consumo de carbohidratos simples",
    ],
    workoutRoutine: [
      {
        day: "Lunes",
        exercises: [
          "Sentadillas 3x12",
          "Press de banca 3x10",
          "Remo con barra 3x10",
        ],
      },
      {
        day: "Miércoles",
        exercises: [
          "Peso muerto 3x8",
          "Prensa de piernas 3x12",
          "Curl de bíceps 3x12",
        ],
      },
      {
        day: "Viernes",
        exercises: [
          "Zancadas 3x10 por pierna",
          "Dominadas 3x8",
          "Plancha 3x30seg",
        ],
      },
    ],
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Bajo peso";
    if (bmi < 25) return "Peso normal";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidad";
  };

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderBmiIndicator = (bmi: number) => {
    const position = Math.min(Math.max((bmi - 15) / 25, 0), 1) * 100;
    return (
      <View style={styles.bmiContainer}>
        <View style={styles.bmiScale}>
          <View style={[styles.bmiIndicator, { left: `${position}%` }]} />
        </View>
        <View style={styles.bmiLabels}>
          <Text style={styles.bmiLabel}>15</Text>
          <Text style={styles.bmiLabel}>25</Text>
          <Text style={styles.bmiLabel}>35</Text>
          <Text style={styles.bmiLabel}>40</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 h-full w-full items bg-white pt-[80px]">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="h-full w-full px-5"
        contentContainerStyle={styles.scrollContent}
      >
        <Text className="font-signika" style={styles.title}>
          Resultados de {userResults.name}
        </Text>

        <View
          className="border border-gray-200 shadow-sm rounded-2xl p-2"
          style={styles.metricsContainer}
        >
          <View style={styles.metricItem}>
            <Icon name="weight-kilogram" size={24} color="#4A5568" />
            <Text className="font-signika" style={styles.metricValue}>
              {userResults.weight} kg
            </Text>
            <Text className="font-signika" style={styles.metricLabel}>
              Peso
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Icon name="human-male-height" size={24} color="#4A5568" />
            <Text className="font-signika" style={styles.metricValue}>
              {userResults.height} cm
            </Text>
            <Text className="font-signika" style={styles.metricLabel}>
              Estatura
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Icon name="fire" size={24} color="#4A5568" />
            <Text className="font-signika" style={styles.metricValue}>
              {userResults.caloriesGoal}
            </Text>
            <Text className="font-signika" style={styles.metricLabel}>
              Cal/día
            </Text>
          </View>
        </View>

        <View
          className="border border-gray-200 shadow-sm"
          style={styles.section}
        >
          <Text className="font-signika" style={styles.sectionTitle}>
            Índice de Masa Corporal (IMC)
          </Text>
          <Text className="font-signika" style={styles.bmiValue}>
            {userResults.bmi.toFixed(1)}
          </Text>
          <Text className="font-signika" style={styles.bmiCategory}>
            {getBmiCategory(userResults.bmi)}
          </Text>
          {renderBmiIndicator(userResults.bmi)}
        </View>

        <View
          className="border border-gray-200 shadow-sm"
          style={styles.section}
        >
          <Text className="font-signika" style={styles.sectionTitle}>
            Observaciones
          </Text>
          <Text className="font-signika" style={styles.observationText}>
            {userResults.observations}
          </Text>
        </View>

        <View
          className="border border-gray-200 shadow-sm"
          style={styles.section}
        >
          <Text className="font-signika" style={styles.sectionTitle}>
            Recomendaciones
          </Text>
          {userResults.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Icon name="check-circle-outline" size={20} color="#729e6b" />
              <Text className="font-signika" style={styles.recommendationText}>
                {rec}
              </Text>
            </View>
          ))}
        </View>

        <View
          className="border border-gray-200 shadow-sm"
          style={styles.section}
        >
          <Text className="font-signika" style={styles.sectionTitle}>
            Rutina de Ejercicios
          </Text>
          {userResults.workoutRoutine.map((day, index) => (
            <View key={index} style={styles.workoutDay}>
              <Text className="font-signika" style={styles.workoutDayTitle}>
                {day.day}
              </Text>
              {day.exercises.map((exercise, exIndex) => (
                <Text
                  className="font-signika"
                  key={exIndex}
                  style={styles.exerciseItem}
                >
                  • {exercise}
                </Text>
              ))}
            </View>
          ))}
        </View>
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
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metricItem: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: "#718096",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 10,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#91C788",
    textAlign: "center",
  },
  bmiCategory: {
    fontSize: 18,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 10,
  },
  bmiContainer: {
    marginTop: 10,
  },
  bmiScale: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    marginBottom: 5,
  },
  bmiIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#91C788",
    position: "absolute",
    top: -5,
  },
  bmiLabels: {
    fontFamily: "Signika-Regular;",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bmiLabel: {
    fontSize: 12,
    color: "#718096",
  },
  observationText: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: "#4A5568",
    marginLeft: 10,
  },
  workoutDay: {
    marginBottom: 15,
  },
  workoutDayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 5,
  },
  exerciseItem: {
    fontSize: 14,
    color: "#4A5568",
    marginLeft: 10,
  },
});

export default Result;
