import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

function ProjectsModule(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProjectDetail")}
        style={styles.btnViewProject}
      >
        <Text style={styles.viewProject}>VIEW PROJECT</Text>
      </TouchableOpacity>
      <View style={styles.rect3Stack}>
        <View style={styles.rect3}>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}></Text>
            <Text style={styles.girasol}>Girasol</Text>
          </View>
          <Text style={styles.loremIpsum1}>
            Este proyecto consiste en una flor de girasol que reacciona con la
            exposición a la luz como la planta.
          </Text>
        </View>
        <Image
          source={require("../assets/images/project_img.jpg")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
      </View>
      <View style={styles.rect1}>
        <Image
          source={require("../assets/images/logosLuTecAppIcon.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.developedProjects}>DEVELOPED PROJECTS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnViewProject: {
    width: 376,
    height: 36,
    backgroundColor: "rgba(55,65,55,1)",
    marginTop: 346
  },
  viewProject: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 140
  },
  rect3: {
    top: 0,
    left: 0,
    width: 376,
    height: 139,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 1
  },
  girasol: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 35,
    marginLeft: 2
  },
  loremIpsumRow: {
    height: 42,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 28,
    marginRight: 235
  },
  loremIpsum1: {
    fontFamily: "roboto-regular",
    color: "rgba(51,45,45,1)",
    height: 73,
    width: 200,
    fontSize: 15,
    textAlign: "justify",
    marginLeft: 30
  },
  image2: {
    top: 0,
    left: 218,
    width: 160,
    height: 139,
    position: "absolute"
  },
  rect3Stack: {
    width: 378,
    height: 139,
    marginTop: -175
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -346
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
  developedProjects: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 9,
    marginLeft: 62
  }
});

export default ProjectsModule;
