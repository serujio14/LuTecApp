import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonLight11(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.back}>BACK</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCCCCC",
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
    color: "#FFFFFF",
    fontSize: 14,
    top: 0,
    left: 32
  }
});

export default MaterialButtonLight11;
