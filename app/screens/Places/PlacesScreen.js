import React, { useState, useEffect } from "react";
import axios from "axios";

import { View, StyleSheet } from "react-native";

import baseURL from "../../utils/baseUrl";

import PlaceList from "../../components/Places/PlaceList";

const PlacesScreen = () => {
  const [places, setPlaces] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    axios
      .get(`${baseURL}/places?pagenumber=${pageNumber}&pagesize=${pageSize}`)
      .then((response) => {
        pageNumber === 1
          ? setPlaces(response.data.places)
          : setPlaces([...places, ...response.data.places]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const loadMorePlacesHandler = () => {
    let morePlaces = [];
    setLoading(true);
    setPageNumber(pageNumber + 1);
    axios
      .get(
        `${baseURL}/places?pagenumber=${pageNumber + 1}&pagesize=${pageSize}`
      )
      .then((response) => {
        response.data.places.forEach((element) => {
          morePlaces.push(element);
        });
        setPlaces([...places, ...morePlaces]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.bodyView}>
      <PlaceList
        places={places}
        loading={loading}
        // loadMorePlacesHandler={loadMorePlacesHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyView: { flex: 1, backgroundColor: "#fff" },
});

export default PlacesScreen;
