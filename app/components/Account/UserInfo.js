import React from "react";
import "firebase/storage";
import * as ImagePicker from "expo-image-picker";

import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

import firebaseApp from "../../config/firebase";

const UserInfo = (props) => {
  const {
    userInfo: { _id, image, username, email },
    toastRef,
    setLoading,
    setLoadingText,
  } = props;

  console.log(_id);

  const uploadImage = async (uri) => {
    setLoadingText("Updating avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebaseApp.storage().ref("users").child(_id);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebaseApp
      .storage()
      .ref(`users/${_id}`)
      .getDownloadURL()
      .then((response) => {
        console.log(response);
        setLoading(false);
      });
  };

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
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch((error) => {
            console.log(error);
            toastRef.current.show(`${error}`);
          });
      }
    }
  };

  return (
    <View style={styles.userInfoView}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.userInfoAvatar}
        source={
          image
            ? { uri: image }
            : require("../../../assets/img/avatar-default.jpg")
        }
        onPress={() => changeAvatarHandler()}
      />
      <View>
        <Text style={styles.username}>{username ? username : "Anon"}</Text>
        <Text>{email ? email : "Social login"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: { marginRight: 20 },
  username: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

export default UserInfo;
