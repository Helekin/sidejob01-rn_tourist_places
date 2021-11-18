import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Moment from "react-moment";
import { map } from "lodash";
import axios from "axios";

import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { UserContext } from "../../context/UserContext";

import baseURL from "../../utils/baseUrl";

const Review = (props) => {
  const { title, review, rating, createdAt, user } = props.review;

  return (
    <View style={styles.reviewView}>
      <View style={styles.imageView}>
        <Avatar
          source={
            user.image
              ? { uri: user.image }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
      </View>
      <View style={styles.infoView}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Moment
          style={styles.reviewDate}
          format="DD/MM/YYYY hh:mm:ss"
          element={Text}
        >
          {createdAt}
        </Moment>
      </View>
    </View>
  );
};

const ReviewList = (props) => {
  const { navigation, placeId } = props;

  const [login, setLogin] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    !user ? setLogin(false) : setLogin(true);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}/reviews/${placeId}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

  return (
    <View>
      {login ? (
        <Button
          title="Escribe una reseña"
          buttonStyle={styles.addReviewButton}
          titleStyle={styles.addReviewTitleButton}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#006a80",
          }}
          onPress={() => {
            navigation.navigate("addPlaceReviewScreen", {
              placeId: placeId,
            });
          }}
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#006a80", padding: 20 }}
            onPress={() => navigation.navigate("loginScreen")}
          >
            Para escribir una reseñar debes iniciar sesión.{" "}
            <Text style={{ fontWeight: "bold" }}>
              Presiona aquí para continuar
            </Text>
          </Text>
        </View>
      )}
      {map(reviews, (review, index) => {
        return <Review key={index} review={review} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  addReviewButton: {
    backgroundColor: "transparent",
  },
  addReviewTitleButton: {
    color: "#00a680",
  },
  reviewView: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  imageView: {
    marginRight: 15,
  },
  userAvatar: {
    width: 50,
    height: 50,
  },
  infoView: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default ReviewList;
