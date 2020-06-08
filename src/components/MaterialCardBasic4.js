import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MaterialCardBasic4(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/p2.jpg")}
        resizeMode="contain"
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Description of what the project is about, materials used and objective
          of the project.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  cardItemImagePlace: {
    flex: 1,
    backgroundColor: "#ccc",
    minHeight: 210
  },
  body: {
    padding: 16
  },
  bodyText: {
    color: "#424242",
    fontSize: 14,
    lineHeight: 20
  }
});

export default MaterialCardBasic4;
