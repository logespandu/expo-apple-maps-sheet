import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const onBottomTabPress: () => void = () => {
    router.push("/(tabs)");
  };
  const onMapViewPress: () => void = () => {
    router.push("/maps");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Navigate To:</Text>

      <Button title="Map View" onPress={onMapViewPress} />
      <Button title="Bottom Tab Navigation" onPress={onBottomTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 40,
    marginBottom: 20,
    letterSpacing: -1,
    fontWeight: "500",
  },
});
