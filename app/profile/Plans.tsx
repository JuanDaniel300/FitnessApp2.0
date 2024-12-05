import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

const Plans = () => {
  // Ejemplo de datos del plan del usuario
  const userPlan = {
    name: "Plan Premium",
    price: "$19.99",
    billingCycle: "mensual",
    features: [
      "Acceso ilimitado a lista de ejercicios",
      "Rutinas de ejercicios personalizados",
      "Soporte prioritario 24/7",
      "Asesorias personalizadas",
    ],
    nextBillingDate: "15 de enero, 2025",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Icon name="award" size={50} color={Colors.dark.textAccent} />
          <Text style={styles.planName}>{userPlan.name}</Text>
          <Text style={styles.planPrice}>
            {userPlan.price}{" "}
            <Text style={styles.billingCycle}>/ {userPlan.billingCycle}</Text>
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Características del plan</Text>
          {userPlan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon
                name="check"
                size={20}
                color="#48bb78"
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.upgradeButtonText}>Regresar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginBottom: 30,
  },
  planName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    marginTop: 10,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark.textAccent,
    marginTop: 5,
  },
  billingCycle: {
    fontSize: 16,
    color: "#718096",
  },
  featuresSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#4a5568",
  },
  billingInfo: {
    backgroundColor: "#ebf8ff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  billingInfoText: {
    fontSize: 14,
    color: "#2b6cb0",
    textAlign: "center",
  },
  upgradeButton: {
    backgroundColor: Colors.dark.textAccent,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  upgradeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e53e3e",
  },
  cancelButtonText: {
    color: "#e53e3e",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Plans;
