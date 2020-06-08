import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function MaterialCardWithTextOverImage2(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/epi.jpg")}
        style={styles.cardItemImagePlace}
      ></Image>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>EPILOG LASER</Text>
          <Text style={styles.subtitleStyle}>
            Configuración de cortadora láser Epilog
          </Text>
        </View>
        <View style={styles.actionBody}>
          <TouchableOpacity style={styles.actionButton1}>
            <Text style={styles.actionText1}>IR</Text>
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
    top: 0,
    left: 0,
    width: 426,
    backgroundColor: "rgba(46,115,175,1)",
    position: "absolute",
    opacity: 0.39
  },
  bodyContent: {
    justifyContent: "center",
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#FFF",
    paddingBottom: 12,
    fontSize: 26,
    fontFamily: "roboto-700"
  },
  subtitleStyle: {
    color: "#FFF",
    opacity: 0.81,
    fontSize: 14,
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

export default MaterialCardWithTextOverImage2;
