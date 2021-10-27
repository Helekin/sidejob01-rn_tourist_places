import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import LoginForm from "../../components/Account/LoginForm";

const CreateAccount = () => {
  const navigation = useNavigation();

  return (
    <Text style={styles.registrationText}>
      No tienes una cuenta?{" "}
      <Text
        style={styles.registerButton}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>
    </Text>
  );
};

const LoginScreen = () => {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  registrationText: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  registerButton: {
    color: "#00a680",
    fontWeight: "bold",
  },
});

export default LoginScreen;
