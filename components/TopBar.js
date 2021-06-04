import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
    backgroundColor: "white",
  },
  header: {
    fontSize: 25,
    color: "#f9a1bc",
    fontFamily: "Merienda",
  },
});
