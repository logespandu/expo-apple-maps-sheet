import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FourthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>FourthScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
  },
});
