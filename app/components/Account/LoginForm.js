import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { isEmpty } from "lodash";

import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import { UserContext } from "../../context/UserContext";

import { validateEmail } from "../../utils/validations";
import baseURL from "../../utils/baseUrl";

import Loader from "../UI/Loader";

const formDefaultValues = () => {
  return {
    email: "",
    password: "",
  };
};

const LoginForm = (props) => {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(formDefaultValues());
  const [loading, setLoading] = useState(false);

  const { login } = useContext(UserContext);

  const navigation = useNavigation();

  const onChangeHandler = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmitHandler = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Correo no válido");
    } else {
      setLoading(true);

      axios
        .post(
          `${baseURL}/users/login`,
          { email: formData.email, password: formData.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          AsyncStorage.setItem("jwt", response.data.token).then(() => {
            login(response.data);
            navigation.navigate("account");
          });
        })
        .catch((error) => {
          toastRef.current.show(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={(e) => onChangeHandler(e, "email")}
        containerStyle={styles.formInput}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.rightIcon}
          />
        }
      />
      <Input
        placeholder="Password"
        secureTextEntry={showPassword ? false : true}
        autoCapitalize="none"
        onChange={(e) => onChangeHandler(e, "password")}
        containerStyle={styles.formInput}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.loginButtonContainer}
        buttonStyle={styles.loginButton}
        onPress={() => onSubmitHandler()}
      />
      <Loader isVisible={loading} text="Iniciando sesión" />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  formInput: {
    width: "100%",
    marginTop: 20,
  },
  loginButtonContainer: {
    marginTop: 20,
    width: "95%",
  },
  loginButton: {
    backgroundColor: "#00a680",
  },
  rightIcon: {
    color: "#c1c1c1",
  },
});

export default LoginForm;
