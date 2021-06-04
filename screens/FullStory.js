import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
const FullStory = ({
  route: {
    params: { videoId, userDetails, title, story, userStory },
  },
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Story",
    });
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <Text style={styles.title}>{title}</Text>
      <YoutubePlayer height={250} videoId={videoId} />
      <Text style={styles.story}>{story}</Text>
      {userStory ? null : (
        <Text style={{ fontSize: 17, fontStyle: "italic", color: "gray" }}>
          ~ By {userDetails.name}
        </Text>
      )}
    </ScrollView>
  );
};

export default FullStory;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#61c0bf",
  },
  story: {
    lineHeight: 25,
    fontSize: 15,
    textAlign: "justify",
  },
});
