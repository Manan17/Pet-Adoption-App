import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const Banner = ({ scrollToFeed }) => {
  return (
    <View style={styles.banner}>
      <Image
        source={require("../assets/bannner.png")}
        style={styles.banner__image}
      />
      <View
        style={{
          position: "absolute",
          top: 35,
          left: 15,
        }}
      >
        <Text style={styles.banner__text}>Adopt Your </Text>
        <Text style={styles.banner__text}>Favourite</Text>
        <Text style={styles.banner__text}>Pet</Text>
        <Button
          title="Explore"
          buttonStyle={{
            backgroundColor: "white",
          }}
          titleStyle={{
            color: "#bad7df",
            fontWeight: "bold",
          }}
          containerStyle={{
            width: 130,
            marginTop: 5,
            borderRadius: 20,
          }}
          onPress={() => {
            scrollToFeed();
          }}
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 3.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bad7df",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 20,
    position: "relative",
  },
  banner__image: {
    width: 250,
    height: 230,
    alignSelf: "flex-end",
    resizeMode: "contain",
    marginRight: -20,
  },
  banner__text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
