import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";

const Place = (props) => {
  const { place, navigation } = props;
  const { _id, name, description, rating, images } = place.item;

  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    if (place.index === 0) {
      setIconColor("#efb819");
    } else if (place.index === 1) {
      setIconColor("#e3e4e5");
    } else if (place.index === 2) {
      setIconColor("#cd7f32");
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("placeScreen", { id: _id })}
    >
      <Card containerStyle={styles.cardContainer}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          containerStyle={styles.iconContainer}
        />
        <Image
          style={styles.placeImage}
          resizeMode="cover"
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../../assets/img/no-image.png")
          }
        />
        <View style={styles.ratingTitle}>
          <Text style={styles.title}>{name}</Text>
          <Rating imageSize={20} startingValue={rating} readonly />
        </View>
        <Text>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const TopPlacesList = (props) => {
  const { places, navigation } = props;

  return (
    <FlatList
      data={places}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(place) => {
        return <Place place={place} navigation={navigation} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 30,
    borderWidth: 0,
  },
  iconContainer: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
  placeImage: {
    width: "100%",
    height: 200,
  },
  ratingTitle: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify",
  },
});

export default TopPlacesList;
