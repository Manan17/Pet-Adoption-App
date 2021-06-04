import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

const TopImage = ({ imgPath }) => {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height / 2,
      }}
    >
      <Image
        animation="bounceIn"
        duration={1500}
        source={imgPath}
        style={styles.image}
      />
    </View>
  );
};

export default TopImage;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    alignSelf: "center",
  },
});
