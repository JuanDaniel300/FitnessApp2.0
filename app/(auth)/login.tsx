import API from "@/constants/api";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/type";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const authZustand = useAuthStore((state: any) => state.login);

  const [email, setEmail] = useState<String | any>("");
  const [password, setPassword] = useState<String | any>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleLoginAuth = () => {
    try {
      console.log("iniciando autenticacion...");

      if (email.length <= 0 || password.length <= 0) {
        throw new Error("Alguno de los campos estan vacios");
      }

      const credentials = {
        usuario: email,
        contrasenia: password,
      };

      API.post("?api=1", credentials)
        .then((response) => {
          const res = response.data.response;
          switch (parseInt(res.data.AUTORIZADO)) {
            case 1:
              const data = res.data.data[0];

              const userData: User = {
                usuario: data.USUARIO,
                name: data.NOMBRE,
                perfil: res.TIPO_USUARIO,
                edad: data.EDAD,
                photo: data.FOTO,
                fecha_nacimiento: data.FECHA_NACIMIENTO,
                peso: data.PESO,
                estautra: data.altura,
                genero: data.SEXO,
              };

              authZustand(userData);
              router.replace("/home/home");
              break;

            default:
              throw new Error("El usuario no esta registrado");
          }
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
          throw new Error("No se pudo iniciar sesión");
        });
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: Colors.light.textAccent,
      }}
    >
      <SafeAreaView className="flex justify-center items-center">
        <LottieView
          autoPlay
          loop
          source={require("../../assets/onboarding/lottie1.json")}
          style={{ width: width - 80, height: 250 }}
        />
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-7">
          <Text className="mt-auto text-center">
            <Text className="text-black font-bold text-3xl">Fitness</Text>
            <Text
              className="text-black font-bold text-3xl"
              style={{ color: Colors.light.textAccent }}
            >
              App
            </Text>
          </Text>
          <View className="space-y-3">
            <Text>Correo Electronico</Text>
            <TextInput
              maxLength={50}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              placeholder="Email"
            />
            {isError && email.length <= 0 ? (
              <Text className="text-red-700">
                Debe ingresar su correo para iniciar sesión
              </Text>
            ) : (
              ""
            )}
          </View>

          <View className="space-y-3">
            <Text>Contraseña</Text>
            <TextInput
              maxLength={25}
              value={password}
              onChangeText={(password: string) => setPassword(password)}
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              placeholder="Password"
              secureTextEntry
            />
            {isError && password.length <= 0 ? (
              <Text className="text-red-700">
                Debe ingresar su contraseña para iniciar sesión
              </Text>
            ) : (
              ""
            )}
          </View>

          <TouchableOpacity
            className="py-3 rounded-xl"
            style={{ backgroundColor: Colors.dark.backgroundSecond }}
            onPress={handleLoginAuth}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-7 space-x-1">
            <Text className="font-semibold">No cuentas con un perfil?</Text>
            <TouchableOpacity>
              <Text
                className="font-semibold"
                style={{ color: Colors.light.textAccent }}
              >
                Registrate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
