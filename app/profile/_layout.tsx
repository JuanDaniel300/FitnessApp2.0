import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileDetails" />
      <Stack.Screen name="Plans" />
    </Stack>
  );
};

export default RootLayout;
