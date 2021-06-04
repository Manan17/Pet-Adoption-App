import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

import { Ionicons, AntDesign } from "react-native-vector-icons";
import { Button } from "react-native-elements";

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const data = await camera.takePictureAsync(null);
    setImage(data.uri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 20,
          position: "absolute",
          top: 0,
          left: -20,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="cross" size={50} color="white" />
      </TouchableOpacity>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio="1:1"
        />
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      <View style={styles.buttonContainer}>
        <Ionicons
          name="camera-reverse-outline"
          size={30}
          color="white"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(52, 52, 52, 1)",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <Ionicons
            name="camera-outline"
            color="white"
            size={35}
            onPress={() => takePicture()}
          />
        </TouchableOpacity>

        <AntDesign
          name="picture"
          color="white"
          size={30}
          onPress={() => pickImage()}
        />

        <Ionicons
          name="send"
          color="white"
          size={30}
          onPress={() => navigation.navigate("Save", { image })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },

  buttonContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    alignItems: "center",
  },

  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
