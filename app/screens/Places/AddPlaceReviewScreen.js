import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-easy-toast";
import axios from "axios";

import { View, StyleSheet } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";

import baseURL from "../../utils/baseUrl";

import Loader from "../../components/UI/Loader";

const AddPlaceReviewScreen = (props) => {
  const { navigation, route } = props;
  const { placeId } = route.params;

  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();

  const addReviewHandler = () => {
    if (!rating) {
      toastRef.current.show("Debes marcar una nota");
    } else if (!title) {
      toastRef.current.show("El titulo es requerido");
    } else if (!review) {
      toastRef.current.show("La reseña es requerida");
    } else {
      setLoading(true);

      AsyncStorage.getItem("jwt").then((token) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const payload = {
          title: title,
          review: review,
          rating: rating,
          place: placeId,
        };

        axios
          .post(`${baseURL}/reviews`, payload, config)
          .then(() => {
            setLoading(false);
            navigation.goBack();
          })
          .catch((error) => console.log(error));
      });
    }
  };

  return (
    <View style={styles.bodyView}>
      <View style={styles.ratingView}>
        <AirbnbRating
          count={5}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.reviewForm}>
        <Input
          placeholder="Título"
          inputContainerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Reseña"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
        <Button
          title="Enviar reseña"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          onPress={() => {
            addReviewHandler();
          }}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loader isVisible={loading} text="Guardando reseña" />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
  },
  ratingView: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  reviewForm: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  button: {
    backgroundColor: "#00a680",
  },
});

export default AddPlaceReviewScreen;
