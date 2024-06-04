import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";

export default function ModalComponent({ isOpen, onClose, children, ...rest }) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Close button if needed */}
            {/* <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity> */}

            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Adjust the width as needed
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
