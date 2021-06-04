import React, { useState, useLayoutEffect, useEffect } from "react";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { auth, db } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TopImage from "../components/TopImage";
import { TextInput } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Register",
      headerTitleStyle: {
        color: "black",
        fontWeight: "bold",
      },
    });
  });

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const childPath = `profile/images/${Math.random().toString(36)}`;
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log("Bytes transferred : " + snapshot.bytesTransferred);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        console.log(snapshot);
        db.collection("users").doc(auth.currentUser.uid).set({
          name,
          email,
          imageUrl: snapshot,
        });
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });

        uploadImage();
      })
      .catch((error) => alert(error.message));

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <TopImage imgPath={require("../assets/SignIn.png")} />

        <Animatable.View animation="fadeInUpBig" style={{ marginTop: -50 }}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text.trim())}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            style={styles.input}
          />
          <TouchableOpacity
            style={{ marginLeft: 20, alignSelf: "center" }}
            onPress={() => {
              if (hasGalleryPermission === null) {
                alert("Allow Permission of Accessing Gallery");
              } else {
                pickImage();
              }
            }}
          >
            <Text
              style={{
                color: "#f9a1bc",
                fontSize: 17,
              }}
            >
              Select Profile Image
            </Text>
          </TouchableOpacity>
          <Button
            title="Sign Up"
            buttonStyle={{ backgroundColor: "#f9a1bc" }}
            containerStyle={{ width: 250, alignSelf: "center", marginTop: 30 }}
            onPress={() => signUp()}
          />
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  input: {
    padding: 20,
    height: 70,
    fontSize: 20,
  },
});
