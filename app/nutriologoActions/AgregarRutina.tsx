import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Save } from "react-native-feather";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import API from "@/constants/api";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const ExerciseCard = React.memo(
  ({ exercise, index, parteCuerpo, isSelected, onToggle }) => (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        { width: CARD_WIDTH },
      ]}
      onPress={() => onToggle(parteCuerpo, exercise.ID_RUTINA)}
    >
      <Image source={{ uri: exercise.IMAGEN }} style={styles.exerciseImage} />
      <View style={styles.cardContent}>
        <Text style={styles.exerciseName}>{exercise.NOMBRE}</Text>
        <Text style={styles.exerciseTime}>{exercise.TIEMPO}</Text>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {exercise.DESCRIPCION}
        </Text>
      </View>
    </TouchableOpacity>
  )
);

const AgregarRutina = () => {
  const navigation = useNavigation();
  const [listExercises, setListExercises] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState<{
    [key: string]: number[];
  }>({});

  const { userDataNavigation } = useLocalSearchParams();

  useEffect(() => {
    if (userDataNavigation) {
      setUserData(JSON.parse(userDataNavigation));
    }
  }, [userDataNavigation]);

  const toggleExerciseSelection = useCallback(
    (parteCuerpo: string, id: number) => {
      setSelectedExercises((prevSelected) => {
        const currentSelected = prevSelected[parteCuerpo] || [];
        const newSelected = currentSelected.includes(id)
          ? currentSelected.filter((selectedId) => selectedId !== id)
          : [...currentSelected, id];

        return {
          ...prevSelected,
          [parteCuerpo]: newSelected,
        };
      });
    },
    []
  );

  useEffect(() => {
    fetchListExercises();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Agregar Rutina Ejercicio",
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: Colors.dark.textAccent,
      },
      headerTintColor: "white",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const fetchListExercises = async () => {
    try {
      const response = await API.post("?api=12");
      const res = response.data.response;
      setListExercises(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalSelectedExercises = useCallback(() => {
    return Object.values(selectedExercises).reduce(
      (total, current) => total + current.length,
      0
    );
  }, [selectedExercises]);

  const handleSaveRoutine = useCallback(async () => {
    const totalSelected = getTotalSelectedExercises();
    if (totalSelected > 0) {
      const allSelectedIds = Object.values(selectedExercises).flat();
      const nuevoArreglo = {
        usuario_id: userData?.id,
        idsEjercicios: allSelectedIds,
      };

      const response = await API.post("?api=11", nuevoArreglo)
        .then((response) => {
          console.log(response);
          console.log("Nuevo arreglo:", nuevoArreglo);
          Alert.alert(
            "Éxito",
            `Rutina guardada con ${totalSelected} ejercicios.`
          );
          router.back();
        })
        .catch(() => {
          Alert.alert(
            "Error",
            "Por favor, selecciona al menos un ejercicio para guardar la rutina."
          );
        });
    } else {
      Alert.alert(
        "Error",
        "Por favor, selecciona al menos un ejercicio para guardar la rutina."
      );
    }
  }, [selectedExercises, getTotalSelectedExercises]);

  const BodyPartCarousel = useCallback(
    ({ seccion, sectionIndex }) => {
      const content = JSON.parse(seccion[0]);
      return (
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>{content?.PARTE_CUERPO}</Text>
          <FlatList
            data={content?.RUTINAS}
            renderItem={({ item, index }) => (
              <ExerciseCard
                exercise={item}
                index={index}
                parteCuerpo={content?.PARTE_CUERPO}
                isSelected={selectedExercises[content?.PARTE_CUERPO]?.includes(
                  item.ID_RUTINA
                )}
                onToggle={toggleExerciseSelection}
              />
            )}
            keyExtractor={(item) =>
              `${content?.PARTE_CUERPO}-${item.ID_RUTINA}`
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
          />
        </View>
      );
    },
    [selectedExercises, toggleExerciseSelection]
  );

  if (listExercises.length <= 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.light.textAccent} />
        <Text className="mt-2 text-gray-600 font-signika">
          Cargando Ejercicios
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text className="px-5 mt-4" style={styles.mainTitle}>
        Agregar Rutina
      </Text>
      <Text className="text-sm text-gray-600 px-5 mb-4">
        Rutina para {userData?.nombre}
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {listExercises.map((seccion, sectionIndex) => (
          <BodyPartCarousel
            key={sectionIndex}
            seccion={seccion}
            sectionIndex={sectionIndex}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Ejercicios seleccionados: {getTotalSelectedExercises()}
          </Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRoutine}>
          <Save color="white" size={24} />
          <Text style={styles.saveButtonText}>Guardar Rutina</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselContent: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: "#91C788",
    borderWidth: 2,
  },
  exerciseImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  exerciseTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#666",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  selectedContainer: {
    padding: 16,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#91C788",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default AgregarRutina;
