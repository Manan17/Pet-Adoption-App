import React from "react";
import { StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

const UserStory = ({ allData, navigation }) => {
  const { videoId, story, title } = allData;
  const userStory = true;
  return (
    <TouchableOpacity
      style={styles.feed_imagesContainer}
      onPress={() => {
        navigation.navigate("FullStory", {
          videoId,
          story,
          title,
          userStory,
        });
      }}
    >
      <Image
        source={{
          uri: `https://i.ytimg.com/vi/${allData.videoId}/hqdefault.jpg`,
        }}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    </TouchableOpacity>
  );
};

export default UserStory;

const styles = StyleSheet.create({
  feed_imagesContainer: {
    width: Dimensions.get("screen").width / 3.1,
    height: 150,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});
