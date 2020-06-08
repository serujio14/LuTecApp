import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function MaterialCardWithTextOverImage4(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/epi.jpg")}
        resizeMode="cover"
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>Epilog laser cutter</Text>
          <Text style={styles.subtitleStyle}>
            Machine configuration parameters
          </Text>
        </View>
        <View style={styles.actionBody}>
          <TouchableOpacity style={styles.actionButton1}>
            <Text style={styles.actionText1}>OPEN</Text>
          </TouchableOpacity>
        </View>
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
    minHeight: 359
  },
  cardBody: {
    left: 0,
    backgroundColor: "rgba(57,14,76,0.77)",
    position: "absolute",
    right: 0,
    bottom: 0
  },
  bodyContent: {
    justifyContent: "center",
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#FFF",
    paddingBottom: 12,
    fontSize: 28,
    fontFamily: "roboto-700"
  },
  subtitleStyle: {
    color: "#FFF",
    opacity: 0.81,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  actionBody: {
    flexDirection: "row",
    padding: 8
  },
  actionButton1: {
    height: 36,
    padding: 8
  },
  actionText1: {
    color: "#FFF",
    opacity: 0.9,
    fontSize: 14
  }
});

export default MaterialCardWithTextOverImage4;
