import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";

const data = [
  {
    id: "1",
    image: require("../assets/petImage.png"),
    title: "Welcome to Pets & Humans",
    desc: "An app where you can adopt a pet!",
  },
  {
    id: "2",
    image: require("../assets/Searching.png"),
    title: "Find your dream pet!",
    desc: "Scroll through our app and find your dream pet!",
  },
  {
    id: "3",
    image: require("../assets/Walking.png"),
    title: "Adopt your favorite pet",
    desc: "As you find your dream pet, adopt it by contacting the user!",
  },
  {
    id: "4",
    image: require("../assets/RescueStory.png"),
    title: "Share your Rescue Story!",
    desc: "Show your rescue story to millions of users!",
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChange = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChange}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollx={scrollx} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
