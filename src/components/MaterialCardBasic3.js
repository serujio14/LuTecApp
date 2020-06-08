import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function MaterialCardBasic3(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/p3.jpg")}
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Brief description of what the project consists about, materials used
          and objective of it&#39;s designer.
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

export default MaterialCardBasic3;
