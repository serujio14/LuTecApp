import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function EditMaterialTextboxName(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 30
  }
});

export default EditMaterialTextboxName;
