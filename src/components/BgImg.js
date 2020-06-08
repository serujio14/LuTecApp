import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

function BgImg(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require("../assets/images/bg.png")}
        resizeMode="contain"
        style={styles.image3}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image3: {
    width: 941,
    height: 941,
    opacity: 0.11
  }
});

export default BgImg;
