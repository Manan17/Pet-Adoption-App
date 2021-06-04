import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { db, auth } from "../firebase";
import firebase from "firebase";

const AddStories = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [story, setStory] = useState("");

  const addStory = () => {
    const links = link.split("/");

    db.collection("stories").add({
      userId: auth.currentUser.uid,
      videoId: links[3],
      title,
      story,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    });

    db.collection("profilePosts")
      .doc(auth.currentUser.uid)
      .collection("userStories")
      .add({
        videoId: links[3],
        title,
        story,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", padding: 20 }}
    >
      <ScrollView>
        <TextInput
          placeholder="Enter Title "
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Enter Youtube Link"
          style={styles.input}
          value={link}
          onChangeText={(text) => setLink(text)}
        />
        <TextInput
          placeholder="Enter your story .. "
          multiline={true}
          style={styles.input}
          value={story}
          numberOfLines={15}
          onChangeText={(text) => setStory(text)}
        />
        <Button
          title="Add Your Story"
          buttonStyle={{
            backgroundColor: "red",
          }}
          containerStyle={{
            marginTop: 20,
          }}
          onPress={() => addStory()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddStories;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    marginVertical: 10,
  },
});
