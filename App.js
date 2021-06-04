import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./screens/Landing";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import "./firebase";
import { auth } from "./firebase";
import Main from "./screens/Main";
import Add from "./screens/Add";
import Save from "./screens/Save";
import AddStories from "./screens/AddStories";
import FullStory from "./screens/FullStory";
import ProfilePost from "./screens/ProfilePost";
import OtherProfile from "./screens/OtherProfile";
import * as Font from "expo-font";

const Stack = createStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Merienda: require("./assets/fonts/Merienda-Bold.ttf"),
    });
  };

  useEffect(() => {
    console.disableYellowBox = true;
    loadFonts();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  });

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Save" component={Save} />
        <Stack.Screen name="AddStories" component={AddStories} />
        <Stack.Screen name="FullStory" component={FullStory} />
        <Stack.Screen name="ProfilePost" component={ProfilePost} />
        <Stack.Screen
          name="Other Profile"
          component={OtherProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
