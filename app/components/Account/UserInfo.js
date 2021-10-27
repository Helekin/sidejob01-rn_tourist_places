import React from "react";
import * as ImagePicker from "expo-image-picker";

import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const UserInfo = (props) => {
  const {
    userInfo: { _id, image, username, email },
    toastRef,
    setLoading,
    setLoadingText,
  } = props;

  const changeAvatarHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "denied") {
      toastRef.current.show(
        "Debes aceptar permisos para cambiar de imagen de perfil"
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled) {
        toastRef.current.show("Selección de imagen cerrada");
      } else {
      }
    }
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default UserInfo;
