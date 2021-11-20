import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-easy-toast";
import axios from "axios";

import { View } from "react-native";

import TopPlacesList from "../../components/TopPlaces/TopPlacesList";

import baseUrl from "../../utils/baseUrl";

const TopPlacesScreen = (props) => {
  const { navigation } = props;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();

  useEffect(() => {
    axios
      .get(`${baseUrl}/reviews/rating`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <TopPlacesList places={places} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
};

export default TopPlacesScreen;
