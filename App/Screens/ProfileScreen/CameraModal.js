import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function CameraModal({ isOpen, onClose, children, ...rest }) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 items-center justify-center bg-zinc-900/40 px-3">
          <View className="bg-white p-4 rounded-xl w-full">
            {/*
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={onClose}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>*/}

            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
