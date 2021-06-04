import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import TopBar from "../components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import Story from "../components/Story";

import { db, auth } from "../firebase";

export default function Stories({ navigation }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    db.collection("stories")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        setStories(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [navigation]);

  return (
    <ScrollView style={{ marginTop: StatusBar.currentHeight }}>
      <View style={{ position: "relative" }}>
        <TopBar title="Rescue Stories" />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 20,
          }}
          onPress={() => {
            navigation.navigate("AddStories");
          }}
        >
          <Ionicons name="ios-add-outline" size={40} color="red" />
        </TouchableOpacity>

        <FlatList
          data={stories}
          renderItem={({ item }) => (
            <Story
              videoId={item.data.videoId}
              userId={item.data.userId}
              story={item.data.story}
              title={item.data.title}
              navigation={navigation}
              id={item.id}
              keyExtractor={(item) => item.id}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  story__header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  story__title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f38181",
  },
  story__info: {
    fontSize: 15,
    textAlign: "justify",
  },
});
