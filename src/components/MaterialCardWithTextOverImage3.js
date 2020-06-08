import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function MaterialCardWithTextOverImage3(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/p1.jpg")}
        resizeMode="center"
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>Projects</Text>
          <Text style={styles.subtitleStyle}>Developed LuTec projects</Text>
        </View>
        <View style={styles.actionBody}>
          <TouchableOpacity style={styles.actionButton1}>
            <Text style={styles.actionText1}>BROWSE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton2}>
            <Text style={styles.actionText2}>CREATE</Text>
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
    backgroundColor: "rgba(10,45,88,0.68)",
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
  },
  actionButton2: {
    height: 36,
    padding: 8
  },
  actionText2: {
    color: "#FFF",
    opacity: 0.9,
    fontSize: 14
  }
});

export default MaterialCardWithTextOverImage3;
