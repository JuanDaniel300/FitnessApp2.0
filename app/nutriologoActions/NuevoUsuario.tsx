import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Calendar,
  Maximize2,
  Activity,
  Phone,
  Check,
} from "react-native-feather";
import { Picker } from "@react-native-picker/picker";
import API from "@/constants/api";

const NuevoUsuario = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    usuario: "",
    contrasenia: "",
    tipo_usuario: 1,
    nombre: "",
    fecha_nacimiento: new Date(),
    peso: "",
    altura: "",
    sexo: "",
    perimetro_cadera: "",
    perimetro_cintura: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Nuevo Usuario",
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
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fecha_nacimiento;
    setShowDatePicker(false);
    setFormData((prevState) => ({
      ...prevState,
      fecha_nacimiento: currentDate,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.usuario)
      newErrors.usuario = "El correo electrónico es requerido";
    if (!formData.contrasenia)
      newErrors.contrasenia = "La contraseña es requerida";
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.peso) newErrors.peso = "El peso es requerido";
    if (!formData.altura) newErrors.altura = "La altura es requerida";
    if (!formData.sexo) newErrors.sexo = "El sexo es requerido";
    if (!formData.perimetro_cadera)
      newErrors.perimetro_cadera = "El perímetro de cadera es requerido";
    if (!formData.perimetro_cintura)
      newErrors.perimetro_cintura = "El perímetro de cintura es requerido";
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Datos del nuevo usuario:", formData);

      API.post("?api=4", formData)
        .then(() => {
          Alert.alert("Éxito", "Usuario creado correctamente");
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert("Éxito", "No se pudo crear el usuario");
        });
    } else {
      Alert.alert("Error", "Por favor, complete todos los campos requeridos");
    }
  };

  const renderInput = (
    name: string,
    label: string,
    icon,
    placeholder: string,
    keyboardType = "default",
    secureTextEntry = false
  ) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-600 mb-1">{label}</Text>
      <View
        className={`flex-row items-center bg-white border rounded-lg px-3 py-2 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        {React.cloneElement(icon, { color: "#91C788", size: 20 })}
        <TextInput
          className="flex-1 ml-2 text-base text-gray-800"
          placeholder={placeholder}
          value={formData[name]}
          onChangeText={(value) => handleChange(name, value)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {errors[name] && (
        <Text className="text-red-500 text-xs mt-1">{errors[name]}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6">
          <View className="py-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Información de cuenta
            </Text>
            {renderInput(
              "usuario",
              "Correo electrónico",
              <Mail />,
              "correo@ejemplo.com",
              "email-address"
            )}
            {renderInput(
              "contrasenia",
              "Contraseña",
              <Lock />,
              "••••••••",
              "default",
              true
            )}
          </View>

          <View className="py-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Información personal
            </Text>
            {renderInput("nombre", "Nombre completo", <User />, "Juan Pérez")}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">
                Fecha de nacimiento
              </Text>
              <TouchableOpacity
                className={`flex-row items-center bg-white border rounded-lg px-3 py-2 ${
                  errors.fecha_nacimiento ? "border-red-500" : "border-gray-300"
                }`}
                onPress={() => setShowDatePicker(true)}
              >
                <Calendar color="#91C788" size={20} />
                <Text className="ml-2 text-base text-gray-800">
                  {formData.fecha_nacimiento.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={formData.fecha_nacimiento}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {renderInput(
              "telefono",
              "Teléfono",
              <Phone />,
              "+1234567890",
              "phone-pad"
            )}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">
                Sexo
              </Text>
              <View className="bg-white border rounded-lg px-3 py-2 border-gray-300">
                <Picker
                  selectedValue={formData.sexo}
                  onValueChange={(itemValue) => handleChange("sexo", itemValue)}
                >
                  <Picker.Item label="Seleccionar" value="" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Femenino" value="Femenino" />
                </Picker>
              </View>
            </View>
          </View>

          <View className="py-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Medidas corporales
            </Text>
            {renderInput("peso", "Peso (kg)", <User />, "70", "numeric")}
            {renderInput(
              "altura",
              "Altura (cm)",
              <Maximize2 />,
              "170",
              "numeric"
            )}
            {renderInput(
              "perimetro_cadera",
              "Perímetro de cadera (cm)",
              <Activity />,
              "90",
              "numeric"
            )}
            {renderInput(
              "perimetro_cintura",
              "Perímetro de cintura (cm)",
              <Activity />,
              "80",
              "numeric"
            )}
          </View>
        </ScrollView>
        <View className="p-3 bg-white border-t border-gray-200">
          <TouchableOpacity
            className="bg-[#91C788] rounded-lg py-2 items-center flex-row justify-center"
            onPress={handleSubmit}
          >
            <Check color="white" size={24} style={{ marginRight: 8 }} />
            <Text className="text-white font-bold text-lg">
              Guardar Usuario
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NuevoUsuario;
