import React from "react";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";

const Map = (props) => {
  const { location, name, height } = props;

  const openMapHandler = () => {
    openMap({
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
      zoom: 19,
      query: name,
    });
  };

  return (
    <MapView
      style={{ height: height, width: "100%" }}
      initialRegion={{
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={() => {
        openMapHandler();
      }}
    >
      <Marker
        coordinate={{
          latitude: location.coordinates[1],
          longitude: location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </MapView>
  );
};

export default Map;
