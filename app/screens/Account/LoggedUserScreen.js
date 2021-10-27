import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { UserContext } from "../../context/UserContext";

import Loader from "../../components/UI/Loader";

const LoggedUserScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false);

  const { user, logout } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  const signOutHandler = () => {
    AsyncStorage.removeItem("jwt").then(() => {
      navigation.navigate("account");
      logout();
      console.log("out");
    });
  };

  return (
    <View>
      <Text>{userInfo ? userInfo._id : "No data"}</Text>
      <Button
        title="Log Out"
        buttonStyle={styles.closeSessionButton}
        titleStyle={styles.closeSessionText}
        onPress={() => signOutHandler()}
      />
      <Loader isVisible={loading} text={loadingText} />
    </View>
  );
};

const styles = StyleSheet.create({
  closeSessionButton: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeSessionText: {
    color: "#00a680",
  },
});

export default LoggedUserScreen;
