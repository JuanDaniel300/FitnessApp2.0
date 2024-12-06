import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  Activity,
  Maximize2,
  Clipboard,
  FileText,
  AlertCircle,
} from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import Usuarios from "../nutriologo/usuarios";
import API from "@/constants/api";

const NuevaConsulta = () => {
  const navigation = useNavigation();
  const { userDataNavigation } = useLocalSearchParams();

  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userDataNavigation) {
      setUserData(JSON.parse(userDataNavigation));
    }
  }, [userDataNavigation]);

  const [formData, setFormData] = useState({
    calorias: "",
    recomendaciones: "",
    observaciones: "",
    peso: "",
    estatura: "",
    imc: "",
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Nueva Consulta",
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: "#91C788",
      },
      headerTintColor: "white",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" size={24} style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Este campo es requerido";
      }
    });

    // Validate numeric fields
    ["calorias", "peso", "estatura", "imc"].forEach((field) => {
      if (formData[field] && isNaN(Number(formData[field]))) {
        newErrors[field] = "Este campo debe ser un número";
      }
    });

    // Additional specific validations
    if (Number(formData.peso) <= 0 || Number(formData.peso) > 500) {
      newErrors.peso = "El peso debe estar entre 0 y 500 kg";
    }
    if (Number(formData.estatura) <= 0 || Number(formData.estatura) > 300) {
      newErrors.estatura = "La estatura debe estar entre 0 y 300 cm";
    }
    if (Number(formData.imc) <= 0 || Number(formData.imc) > 100) {
      newErrors.imc = "El IMC debe estar entre 0 y 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const consultaData = {
        ...formData,
        usuario_id: userData?.id,
        visualizar: 0,
      };
      console.log("Datos de la nueva consulta:", consultaData);

      API.post("?api=10", consultaData)
        .then(() => {
          Alert.alert("Éxito", "Consulta creada correctamente");
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert("Éxito", "No se pudo guardar la consulta");
        });
    } else {
      Alert.alert("Error", "Por favor, corrija los errores en el formulario");
    }
  };

  const renderCard = (title: string, children: React.ReactNode) => (
    <View className="bg-white rounded-xl shadow-sm mb-4 p-4">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
      {children}
    </View>
  );

  const renderInput = (
    name: string,
    label: string,
    icon,
    placeholder: string,
    keyboardType = "default",
    multiline = false
  ) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-600 mb-1">{label}</Text>
      <View
        className={`flex-row items-center bg-gray-100 rounded-lg px-3 py-2 ${
          multiline ? "items-start" : ""
        } ${errors[name] ? "border border-red-500" : ""}`}
      >
        <TextInput
          className={`flex-1 ml-2 text-base text-gray-800 ${
            multiline ? "h-24" : ""
          }`}
          placeholder={placeholder}
          value={formData[name]}
          onChangeText={(value) => handleChange(name, value)}
          keyboardType={keyboardType}
          multiline={multiline}
        />
      </View>
      {errors[name] && (
        <View className="flex-row items-center mt-1">
          <AlertCircle color="red" size={16} />
          <Text className="text-red-500 text-xs ml-1">{errors[name]}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4">
          <View className="py-4">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Nueva Consulta
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Consulta para {userData?.nombre}
            </Text>

            {renderCard(
              "Medidas Corporales",
              <>
                {renderInput(
                  "peso",
                  "Peso (kg)",
                  <Usuarios />,
                  "70",
                  "numeric"
                )}
                {renderInput(
                  "estatura",
                  "Estatura (cm)",
                  <Maximize2 />,
                  "170",
                  "numeric"
                )}
                {renderInput("imc", "IMC", <Clipboard />, "22.5", "numeric")}
              </>
            )}

            {renderCard(
              "Plan Nutricional",
              renderInput(
                "calorias",
                "Calorías Diarias",
                <Activity />,
                "2000",
                "numeric"
              )
            )}

            {renderCard(
              "Recomendaciones",
              renderInput(
                "recomendaciones",
                "Detalles",
                <FileText />,
                "Ingrese las recomendaciones...",
                "default",
                true
              )
            )}

            {renderCard(
              "Observaciones",
              renderInput(
                "observaciones",
                "Notas",
                <FileText />,
                "Ingrese las observaciones...",
                "default",
                true
              )
            )}
          </View>
        </ScrollView>
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            className="bg-[#91C788] rounded-lg py-4 items-center flex-row justify-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-lg">
              Guardar Consulta
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NuevaConsulta;
