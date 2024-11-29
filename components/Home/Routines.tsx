import { Colors } from "@/constants/Colors";
import { Text, TouchableOpacity, View } from "react-native";

const Routine = () => {
  return (
    <View className="h-[88px] rounded-2xl shadow-sm bg-[#91c788]">
      <View className="flex flex-row h-full items-center justify-between px-5">
        <View className="w-[50%] h-full  justify-center  ">
          <Text className="text-white font-bold text-xl font-signika">
            Mira tu rutina
          </Text>
          <Text className="text-white font-bold text-xl font-signika">
            Darle clic al boton
          </Text>
        </View>
        <View className="w-[50%] h-full  justify-center items-center ">
          <TouchableOpacity
            className="py-1 w-[70%] rounded-xl bg-[#d2facc]"
            onPress={() => {
              console.log("presddd");
            }}
          >
            <Text className="text-center text-[#91c788] text-lg font-semibold">
              Ir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Routine;
