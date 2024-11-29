import { Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "Title 1",
    text: "Description.\nSay something cool",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gym-flyer-template-design-5c142638af23a5f10f8cb4523da70bf2_screen.jpg?ts=1642525988",
  },
  {
    key: 2,
    title: "Title 2",
    text: "Other cool stuff",
    image: "https://img.pikbest.com/origin/10/11/50/29jpIkbEsTwS3.jpg!bwr800",
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fitness-gym-design-template-5114f87408daf947703854487f2decb7_screen.jpg?ts=1595350530",
    backgroundColor: "#22bcb5",
  },
];

const SliderBanner = () => {
  const sliderItem = ({ item }: any) => {
    return (
      <View className="flex w-full h-full rounded-2xl overflow-hidden">
        <Image
          style={styles.sliderBanner}
          source={{
            uri: item.image,
          }}
        />
      </View>
    );
  };
  return (
    <AppIntroSlider
      showNextButton={false}
      showDoneButton={false}
      renderItem={sliderItem}
      data={slides}
    ></AppIntroSlider>
  );
};

export default SliderBanner;

const styles = StyleSheet.create({
  sliderBanner: {
    width: "100%",
    height: 190,
    objectFit: "cover",
  },
});
