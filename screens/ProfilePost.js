import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { db } from "../firebase";
const ProfilePost = ({
  route: {
    params: {
      allData: { address, healthDoc, imageURL, number, petType },
      id,
    },
  },
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Post",
    });
  });

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

  return (
    <View>
      <View style={{ height: Dimensions.get("screen").height / 2 }}>
        <Image
          source={{ uri: imageURL }}
          style={{ flex: 1, resizeMode: "contain" }}
        />
      </View>
      <View style={{ padding: 10 }}>
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
  );
};

export default ProfilePost;

const styles = StyleSheet.create({
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
