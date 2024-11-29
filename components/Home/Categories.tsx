import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Dimensions, ImageBackground } from "react-native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH;

const Categories = ({ categories }: { categories: any }) => {
  const randomColor = () => {
    const colors = ["#FFF2F0", "#EFF7EE", "#FFF8EB"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const CategoriesItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable
        className="pl-5"
        key={index}
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }}
        onPress={() => {
          console.log(item.NOMBRE);
          router.push({
            pathname: "/category",
            params: { category: JSON.stringify(item) },
          });
        }}
      >
        <ImageBackground
          source={{ uri: item.IMAGEN }}
          className="flex-1 overflow-hidden rounded-3xl"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            className="flex-1 justify-end p-4"
          >
            <Text className="text-white text-xl font-bold">{item.NOMBRE}</Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  };

  if (!categories.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.light.textAccent} />
        <Text className="mt-2 text-gray-600 font-signika">
          Cargando categorías...
        </Text>
      </View>
    );
  }

  return (
    <View>
      {categories.length > 0 ? (
        <>
          <Text className="text-lg mx-5 font-semibold font-signika mb-1">
            Categorias
          </Text>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <CategoriesItem item={item} index={index} />
            )}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={true}
            horizontal
            decelerationRate="fast"
          />
        </>
      ) : (
        ""
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 20,
  },
  listContainer: {
    padding: 0,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    height: 144,
    width: 132,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para sombras en Android
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
