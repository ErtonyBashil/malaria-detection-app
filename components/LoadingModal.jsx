import { StatusBar } from "expo-status-bar";
import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.text}>Traitement...</Text>
        </View>
      </View>
      <StatusBar style="dark" />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LoadingModal;
