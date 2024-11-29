import { sliderList } from "@/types/type";

export const slides: Array<sliderList> = [
  {
    id: 1,
    title: "Bienvenido a Fitness App",
    description:
      "Tu camino hacia una vida más saludable empieza aquí. Con la ayuda de un nutriólogo profesional, recibirás planes personalizados de ejercicios y nutrición.",
    image: require("../assets/onboarding/lottie1.json"),
  },
  {
    id: 2,
    title: "Planes de Ejercicio Personalizados",
    description:
      "Tu nutriólogo te asignará una rutina de ejercicios diseñada específicamente para tus objetivos y condición física.",
    image: require("../assets/onboarding/lottie2.json"),
  },
  {
    id: 3,
    title: "Nutrición Adecuada",
    description:
      "Recibe recomendaciones nutricionales precisas para mejorar tu rendimiento y bienestar, elaboradas por un profesional.",
    image: require("../assets/onboarding/lottie3.json"),
  },
  {
    id: 4,
    title: "Seguimiento y Progreso",
    description:
      "Monitorea tu progreso y ajusta tu plan junto con tu nutriólogo a medida que avanzas en tu camino hacia una mejor salud.",
    image: require("../assets/onboarding/lottie4.json"),
  },
];
