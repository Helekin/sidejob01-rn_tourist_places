import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const GuestUserScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Mira tu Perfil</Text>
      <Text style={styles.description}>Escoge tu lugar favorito</Text>
      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          title="Ver Perfil"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttonView: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    width: "70%",
  },
  button: {
    backgroundColor: "#00a680",
  },
});

export default GuestUserScreen;
