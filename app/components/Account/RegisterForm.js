import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { size, isEmpty } from "lodash";
import axios from "axios";

import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import { validateEmail } from "../../utils/validations";

import baseURL from "../../utils/baseUrl";

import Loader from "../UI/Loader";

const formDefaultValues = () => {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
};

const RegisterForm = (props) => {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(formDefaultValues);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChangeHandler = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmitHandler = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.username) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son requeridos");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Correo electrónico inválido");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas no coinciden");
    } else if (size(formData.password) < 6) {
      toastRef.current.show("La contraseña debe tener almenos 6 caractéres");
    } else {
      setLoading(true);
      axios
        .post(
          `${baseURL}/users`,
          {
            email: formData.email,
            username: formData.username,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setLoading(false);
          navigation.navigate("login");
        })
        .catch((error) => {
          setLoading(false);
          toastRef.current.show(error.message);
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
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
        placeholder="Nombre de usuario"
        onChange={(e) => onChangeHandler(e, "username")}
        containerStyle={styles.formInput}
        rightIcon={
          <Icon
            type="material-community"
            name="account-circle"
            iconStyle={styles.rightIcon}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        onChange={(e) => onChangeHandler(e, "password")}
        containerStyle={styles.formInput}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        onChange={(e) => onChangeHandler(e, "repeatPassword")}
        containerStyle={styles.formInput}
        secureTextEntry={showRepeatPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.rightIcon}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.registerButtonContainer}
        buttonStyle={styles.registerButton}
        onPress={() => onSubmitHandler()}
      />
      <Loader isVisible={loading} text="Creando cuenta" />
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
  registerButtonContainer: {
    marginTop: 20,
    width: "95%",
  },
  registerButton: {
    backgroundColor: "#00a680",
  },
  rightIcon: {
    color: "#c1c1c1",
  },
});

export default RegisterForm;
