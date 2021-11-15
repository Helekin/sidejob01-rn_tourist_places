import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { map } from "lodash";
import axios from "axios";

import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";

import ImagesCarousel from "../../components/UI/ImagesCarousel";
import Loader from "../../components/UI/Loader";
import Map from "../../components/UI/Map";

import baseURL from "../../utils/baseUrl";

const screenWidth = Dimensions.get("window").width;

const PlaceTitle = (props) => {
  const { name, description, rating } = props;

  return (
    <View style={styles.placeTitleView}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const PlaceInfo = (props) => {
  const { location, name, address } = props;

  const infoList = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.placeInfoView}>
      <Text style={styles.placeInfoTitle}>Información del lugar</Text>
      <Map location={location} name={name} height={100} />
      {map(infoList, (item, index) => {
        return (
          <ListItem key={index} containerStyle={styles.listItemContainer}>
            <Icon name={item.iconName} type={item.iconType} color={"#00a680"} />
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem>
        );
      })}
    </View>
  );
};

const PlaceScreen = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;

  const [place, setPlace] = useState(null);

  useFocusEffect(
    useCallback(() => {
      axios.get(`${baseURL}/places/${id}`).then((response) => {
        setPlace(response.data);
      });
    }, [])
  );

  if (!place) return <Loader isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.bodyView}>
      <ImagesCarousel
        imagesArray={place.images}
        height={250}
        width={screenWidth}
      />
      <PlaceTitle name={place.name} description={place.description} />
      <PlaceInfo
        location={place.location}
        name={place.name}
        address={place.address}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeTitleView: {
    padding: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    paddingTop: 20,
    right: 0,
  },
  placeInfoView: {
    margin: 15,
    marginTop: 25,
  },
  placeInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItemContainer: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
});

export default PlaceScreen;
