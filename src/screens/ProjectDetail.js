import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialButtonSuccess8 from "../components/MaterialButtonSuccess8";

function ProjectDetail(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect1}>
        <Image
          source={require("../assets/images/logosLuTecAppIcon.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.text}>PROJECT DETAIL</Text>
      </View>
      <View style={styles.loremIpsumRow}>
        <Text style={styles.loremIpsum}></Text>
        <Text style={styles.girasol1}>Girasol</Text>
      </View>
      <View style={styles.createdByRow}>
        <Text style={styles.createdBy}>CREATED BY:</Text>
        <Text style={styles.christopher}>Christopher Ramírez Vega</Text>
      </View>
      <View style={styles.materialButtonSuccess9Stack}>
        <MaterialButtonSuccess8
          style={styles.materialButtonSuccess9}
        ></MaterialButtonSuccess8>
        <MaterialButtonSuccess8
          style={styles.materialButtonSuccess10}
        ></MaterialButtonSuccess8>
      </View>
      <Text style={styles.loremIpsum1}>
        Este proyecto consiste en una flor de girasol que reacciona con la
        exposición a la luz como la planta.
      </Text>
      <View style={styles.dateCreatedRow}>
        <Text style={styles.dateCreated}>DATE CREATED:</Text>
        <Text style={styles.christopher1}>01/01/01</Text>
      </View>
      <View style={styles.rect3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)"
  },
  image: {
    width: 329,
    height: 65,
    marginTop: 53,
    marginLeft: 23
  },
  rect2: {
    width: 376,
    height: 48,
    backgroundColor: "rgba(76,76,77,1)"
  },
  text: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 11,
    marginLeft: 96
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 8
  },
  girasol1: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 35,
    marginLeft: 2
  },
  loremIpsumRow: {
    height: 42,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 28,
    marginRight: 234
  },
  createdBy: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  christopher: {
    fontFamily: "roboto-regular",
    color: "rgba(0,150,136,1)",
    textAlign: "left",
    marginLeft: 6
  },
  createdByRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 211,
    marginLeft: 27,
    marginRight: 97
  },
  materialButtonSuccess9: {
    height: 54,
    width: 188,
    position: "absolute",
    left: 0,
    top: 0
  },
  materialButtonSuccess10: {
    height: 54,
    width: 188,
    position: "absolute",
    left: 0,
    top: 0
  },
  materialButtonSuccess9Stack: {
    width: 188,
    height: 54,
    marginTop: 163,
    marginLeft: -1519
  },
  loremIpsum1: {
    fontFamily: "roboto-regular",
    color: "rgba(51,45,45,1)",
    height: 124,
    width: 314,
    fontSize: 16,
    textAlign: "justify",
    marginTop: -193,
    marginLeft: 31
  },
  dateCreated: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  christopher1: {
    fontFamily: "roboto-regular",
    color: "rgba(0,150,136,1)",
    textAlign: "left",
    marginLeft: 5
  },
  dateCreatedRow: {
    height: 16,
    flexDirection: "row",
    marginTop: -145,
    marginLeft: 27,
    marginRight: 184
  },
  rect3: {
    width: 324,
    height: 187,
    backgroundColor: "#E6E6E6",
    marginTop: -240,
    marginLeft: 28
  }
});

export default ProjectDetail;
