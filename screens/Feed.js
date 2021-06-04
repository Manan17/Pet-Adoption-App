import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { db } from "../firebase";
import AnimatedSplash from "react-native-animated-splash-screen";
import FeedPosts from "../components/FeedPost";
import TopBar from "../components/TopBar";
import Banner from "../components/Banner";
import DropDownPicker from "react-native-dropdown-picker";

const Feed = ({ navigation }) => {
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1000);
  }, []);

  const petTypes = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Dog",
      value: "dog",
    },
    {
      label: "Cat",
      value: "cat",
    },
    {
      label: "Rabbit",
      value: "rabbit",
    },
    {
      label: "Birds",
      value: "birds",
    },
  ];

  const scrollToFeed = () => {
    scrollRef.current.scrollTo({ x: 0, y: 280, animated: true });
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [navigation]);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={load}
      logoImage={require("../assets/logo.png")}
      backgroundColor={"#ffb6b9"}
      logoHeight={250}
      logoWidth={250}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          backgroundColor: "white",
        }}
      >
        <ScrollView ref={scrollRef}>
          <TopBar title="Pets & Humans" />
          <Banner scrollToFeed={scrollToFeed} />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.feed_text}>Find Your Pet</Text>
            <DropDownPicker
              items={petTypes}
              defaultValue={filter}
              containerStyle={{
                height: 50,
                flex: 1,
                marginLeft: 20,
                marginRight: 10,
              }}
              style={{ backgroundColor: "#fafafa" }}
              globalTextStyle={{ fontSize: 17 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setFilter(item.value)}
            />
          </View>
          {posts?.map((post) => {
            if (filter === "all") {
              return (
                <FeedPosts
                  id={post.id}
                  key={post.id}
                  address={post.data.address}
                  healthDoc={post.data.healthDoc}
                  imageUrl={post.data.imageURL}
                  number={post.data.number}
                  petType={post.data.petType}
                  userId={post.data.userId}
                  navigation={navigation}
                />
              );
            } else {
              if (filter === post.data.petType) {
                return (
                  <FeedPosts
                    id={post.id}
                    key={post.id}
                    address={post.data.address}
                    healthDoc={post.data.healthDoc}
                    imageUrl={post.data.imageURL}
                    number={post.data.number}
                    petType={post.data.petType}
                    userId={post.data.userId}
                    navigation={navigation}
                  />
                );
              }
            }
          })}
        </ScrollView>
      </View>
    </AnimatedSplash>
  );
};

export default Feed;

const styles = StyleSheet.create({
  feed_text: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
