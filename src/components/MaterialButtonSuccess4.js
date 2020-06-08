import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonSuccess4(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.createAccount}>CREATE ACCOUNT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#009688",
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
  createAccount: {
    color: "#fff",
    fontSize: 14
  }
});

export default MaterialButtonSuccess4;
