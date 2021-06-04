import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import Onboarding from "../components/Onboarding";

const Landing = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <Onboarding />
      <Animatable.View style={styles.buttons} animation="fadeInRightBig">
        <Button
          title="Sign Up"
          containerStyle={{ width: 250 }}
          buttonStyle={{ backgroundColor: "#f9a1bc" }}
          onPress={() => navigation.navigate("SignUp")}
        />
        <Button
          title="Sign In"
          type="outline"
          containerStyle={{ width: 250 }}
          onPress={() => navigation.navigate("SignIn")}
          titleStyle={{
            color: "#f9a1bc",
          }}
        />
      </Animatable.View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Roboto",
  },

  subtitle: {
    fontSize: 17,
    padding: 10,
    marginLeft: 10,
    color: "#52616b",
  },

  optionText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "serif",
  },

  buttons: {
    alignItems: "center",
    flex: 0.3,
    justifyContent: "space-evenly",
    marginTop: -50,
  },
});
