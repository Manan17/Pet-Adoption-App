import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { Avatar } from "react-native-elements";
import { db } from "../firebase";

import { Ionicons, MaterialIcons } from "react-native-vector-icons";
const Story = ({ videoId, userId, title, navigation, story }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUserDetails(snapshot.data());
      });
  }, []);

  const shareLink = async () => {
    await Share.share({
      message: `A message from Pets&Humans App \nTitle : ${title} \nYoutube Link : https://youtu.be/${videoId}`,
    });
  };

  return (
    <View
      style={{
        margin: 10,
        elevation: 2,
        borderColor: "#ccccccc",
        padding: 10,
        borderRadius: 20,
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={styles.story__header}
        onPress={() => navigation.navigate("Other Profile", { userId })}
      >
        <Avatar rounded source={{ uri: userDetails?.imageUrl }} />

        <Text style={{ marginLeft: 15, fontWeight: "bold", fontSize: 15 }}>
          {userDetails?.name}
        </Text>
      </TouchableOpacity>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              ...styles.story__title,
              color: "black",
              fontWeight: "normal",
            }}
          >
            Title :
          </Text>
          <Text style={{ marginLeft: 15, ...styles.story__title }}>
            {" "}
            {title}
          </Text>
        </View>
        <View style={{ height: 220 }}>
          <Image
            source={{ uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }}
            style={{ flex: 1, borderRadius: 20 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          justifyContent: "space-around",
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={shareLink}>
          <Ionicons name="share-social-outline" size={30} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("FullStory", {
              videoId,
              userDetails,
              title,
              story,
            })
          }
        >
          <MaterialIcons name="read-more" size={35} />
          <Text
            style={{
              fontSize: 10,
            }}
          >
            Full Story
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  story__header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },
  story__title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#61c0bf",
    marginTop: 10,
    marginLeft: 10,
  },
  story__info: {
    fontSize: 15,
    textAlign: "justify",
  },
});
