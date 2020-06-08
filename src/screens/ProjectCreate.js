import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import MaterialFixedLabelTextbox9 from "../components/MaterialFixedLabelTextbox9";
import MaterialFixedLabelTextbox10 from "../components/MaterialFixedLabelTextbox10";
import MaterialFixedLabelTextbox11 from "../components/MaterialFixedLabelTextbox11";

function ProjectCreate(props) {
  return (
    <View style={styles.container}>
      <View style={styles.btnCreateProjectStack}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ProjectsModule")}
          style={styles.btnCreateProject}
        >
          <Text style={styles.createProject2}>CREATE PROJECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ProjectCreate")}
          style={styles.btnUploadImg}
        >
          <Text style={styles.uploadImage}>UPLOAD IMAGE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rect1}>
        <Image
          source={require("../assets/images/logosLuTecAppIcon.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.createProject}>CREATE PROJECT</Text>
      </View>
      <View style={styles.loremIpsumStack}>
        <Text style={styles.loremIpsum}></Text>
        <View style={styles.projectNameStack}>
          <Text style={styles.projectName}>PROJECT NAME</Text>
          <MaterialFixedLabelTextbox9
            style={styles.materialFixedLabelTextbox9}
          ></MaterialFixedLabelTextbox9>
        </View>
      </View>
      <Text style={styles.projectDate}>PROJECT DATE</Text>
      <Text style={styles.projectDescription}>PROJECT DESCRIPTION</Text>
      <MaterialFixedLabelTextbox10
        style={styles.materialFixedLabelTextbox10}
      ></MaterialFixedLabelTextbox10>
      <MaterialFixedLabelTextbox11
        style={styles.materialFixedLabelTextbox11}
      ></MaterialFixedLabelTextbox11>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnCreateProject: {
    top: 0,
    left: 187,
    width: 188,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(0,150,136,1)"
  },
  createProject2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 37
  },
  btnUploadImg: {
    top: 0,
    left: 0,
    width: 188,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(74,74,74,1)"
  },
  uploadImage: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 45
  },
  btnCreateProjectStack: {
    width: 375,
    height: 54,
    marginTop: 698
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -752
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
  createProject: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 88
  },
  loremIpsum: {
    top: 4,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  projectName: {
    top: 0,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox9: {
    height: 43,
    width: 324,
    position: "absolute",
    left: 0,
    top: 15
  },
  projectNameStack: {
    top: 0,
    left: 0,
    width: 324,
    height: 58,
    position: "absolute"
  },
  loremIpsumStack: {
    width: 324,
    height: 58,
    marginTop: 27,
    marginLeft: 28
  },
  projectDate: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 33,
    marginLeft: 30
  },
  projectDescription: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 77,
    marginLeft: 30
  },
  materialFixedLabelTextbox10: {
    height: 43,
    width: 324,
    marginTop: -93,
    marginLeft: 28
  },
  materialFixedLabelTextbox11: {
    height: 43,
    width: 324,
    marginTop: 50,
    marginLeft: 28
  }
});

export default ProjectCreate;
