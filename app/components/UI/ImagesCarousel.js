import React from "react";
import Carousel from "react-native-snap-carousel";

import { Image } from "react-native-elements";

const ImagesCarousel = (props) => {
  const { imagesArray, height, width } = props;

  const renderItem = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };

  return (
    <Carousel
      layout={"default"}
      data={imagesArray}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
};

export default ImagesCarousel;
