import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonGrey(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.back}>BACK</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(74,74,74,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  back: {
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    top: 0,
    left: 24
  }
});

export default MaterialButtonGrey;
