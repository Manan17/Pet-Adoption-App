import React from "react";
import { StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

const UserPost = ({ allData, id, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.feed_imagesContainer}
      onPress={() => {
        navigation.navigate("ProfilePost", {
          allData,
          id,
        });
      }}
    >
      <Image
        source={{
          uri: allData.imageURL,
        }}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    </TouchableOpacity>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  feed_imagesContainer: {
    width: Dimensions.get("screen").width / 3.1,
    height: 150,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});
