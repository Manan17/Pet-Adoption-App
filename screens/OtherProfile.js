import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import UserPost from "../components/UserPost";
import { Feather, Ionicons, MaterialIcons } from "react-native-vector-icons";
import UserStory from "../components/UserStory";

const OtherProfile = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  console.log(userId);
  const [userDetails, setUserDetails] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUserDetails(snapshot.data());
      });

    db.collection("profilePosts")
      .doc(userId)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    db.collection("profilePosts")
      .doc(userId)
      .collection("userStories")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        setUserStories(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const PostList = () => {
    return userPosts.length > 0 ? (
      <FlatList
        data={userPosts}
        renderItem={({ item }) => (
          <UserPost allData={item.data} id={item.id} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "gray",
          }}
        >
          No posts uploaded
        </Text>
      </View>
    );
  };

  const StoryList = () => {
    return userStories?.length > 0 ? (
      <FlatList
        data={userStories}
        renderItem={({ item }) => (
          <UserStory allData={item.data} id={item.id} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "gray",
          }}
        >
          No stories uploaded
        </Text>
      </View>
    );
  };

  return (
    <View>
      <StatusBar translucent={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      >
        <View style={styles.topContainer}>
          <ImageBackground
            source={{ uri: "https://cdn.wallpapersafari.com/45/16/JALWY4.jpg" }}
            style={{ flex: 1 }}
          >
            <View
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
            ></View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: userDetails.imageUrl,
            }}
            style={styles.profileImage}
          />
        </View>
        <View
          style={{
            marginTop: 80,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>
            {userDetails.name}
          </Text>
          <Text style={{ color: "grey", fontSize: 15 }}>
            {userDetails.email}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderTopColor: "#cccccc",
              borderTopWidth: 2,
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.5,
                alignItems: "center",
                borderBottomColor: `${tabIndex === 0 ? "black" : "white"}`,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
              onPress={() => setTabIndex(0)}
            >
              <Ionicons
                name="apps-outline"
                size={30}
                color={`${tabIndex === 0 ? "#f9a1bc" : "#c9d6df"}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.5,
                alignItems: "center",
                paddingBottom: 10,
                borderBottomColor: `${tabIndex === 1 ? "black" : "white"}`,
                borderBottomWidth: 2,
              }}
              onPress={() => setTabIndex(1)}
            >
              <MaterialIcons
                name="history-edu"
                size={30}
                color={`${tabIndex === 1 ? "#f9a1bc" : "#c9d6df"}`}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {tabIndex === 0 ? <PostList /> : <StoryList />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OtherProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  topContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 3,
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    position: "absolute",
    top: Dimensions.get("screen").height / 3.9,
    left: Dimensions.get("screen").width / 2.9,
    zIndex: 1,
    borderRadius: 100,
  },
  profileImage: {
    flex: 1,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
  },

  feed_imagesContainer: {
    width: Dimensions.get("screen").width / 3.1,
    height: 150,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});
