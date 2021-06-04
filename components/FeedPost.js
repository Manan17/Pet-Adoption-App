import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { db } from "../firebase";
const FeedPosts = ({
  id,
  address,
  number,
  imageUrl,
  healthDoc,
  petType,
  userId,
  navigation,
}) => {
  const [userDetails, setUserDetails] = useState({});
  const downloadDoc = async () => {
    const downloadResumable = FileSystem.createDownloadResumable(
      healthDoc,
      FileSystem.documentDirectory + "image.jpg",
      {}
    );
    try {
      let cameraPer = await MediaLibrary.getPermissionsAsync();
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      if (cameraPer.status === "granted") {
        MediaLibrary.saveToLibraryAsync(uri);
        ToastAndroid.show(
          "Image Downloaded",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUserDetails(snapshot.data());
      });
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2,
          marginLeft: 15,
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("Other Profile", { userId })}
      >
        <Avatar
          rounded
          source={{
            uri: userDetails?.imageUrl,
          }}
        />
        <Text style={{ marginLeft: 15, fontSize: 15, fontWeight: "bold" }}>
          {userDetails?.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.feedContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{
              flex: 1,
              borderRadius: 20,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingLeft: 10,
          }}
        >
          <View style={styles.pet_infoTextContainer}>
            <Text style={{ ...styles.pet_infoText, fontWeight: "bold" }}>
              Pet Type :{" "}
            </Text>
            <Text style={styles.pet_infoText}>{petType.toUpperCase()}</Text>
          </View>
          <View style={styles.pet_infoTextContainer}>
            <Text style={{ ...styles.pet_infoText, fontWeight: "bold" }}>
              Address :{" "}
            </Text>
            <Text style={styles.pet_infoText}>{address}</Text>
          </View>
          <View style={styles.pet_infoTextContainer}>
            <Text style={{ ...styles.pet_infoText, fontWeight: "bold" }}>
              Whatsapp Number :{" "}
            </Text>
            <Text style={styles.pet_infoText}>{number}</Text>
          </View>
          <TouchableOpacity onPress={() => downloadDoc()}>
            <Text style={styles.healthdoc_text}>Download Health Doc</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedPosts;

const styles = StyleSheet.create({
  feedContainer: {
    margin: 10,
    borderColor: "#D9D7D7",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  imageContainer: {
    height: 280,
  },
  iconContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 50,
  },
  pet_infoTextContainer: { flexDirection: "row", alignItems: "center" },
  pet_infoText: {
    marginVertical: 5,
    fontSize: 16,
  },
  healthdoc_text: {
    fontSize: 17,
    color: "#f9a1bc",
    alignSelf: "center",
  },
});
