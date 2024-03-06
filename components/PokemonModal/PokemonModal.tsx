import React from "react";
import { StyleSheet, View, Modal, Text, Pressable } from "react-native";

export default function PokemonModal({
  children,
  modalVisible,
  setModalVisible,
  onModalClose,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onModalClose?: () => void;
}) {
  const onClose = () => {
    onModalClose && onModalClose();
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});
