import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

function ProjectsModule(props) {
  return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Image
              source={require("../assets/images/logosLuTecAppIcon.png")}
              resizeMode="contain"
              style={styles.image}
          ></Image>
        </View>

        <Text style={styles.title}>DEVELOPED PROJECTS</Text>

        <View style={styles.projectContainer}>
          <View style={styles.projectImageContainer}>
          <Image
              source={require("../assets/images/project_img.jpg")}
              resizeMode="contain"
              style={styles.projectImage}
          ></Image>
          </View>
          <View style={styles.projectInfoContainer}>
            <Text style={styles.projectTitle}>Girasol</Text>
            <Text style={styles.projectDescription}>
              Este proyecto consiste en una flor de girasol que reacciona con la
              exposición a la luz como la planta.
            </Text>
          </View>

          <TouchableOpacity
              onPress={() => props.navigation.navigate("ProjectDetail")}
              style={styles.btnWide2}
          >
            <Text style={styles.btnLabel2}>VIEW PROJECT</Text>
          </TouchableOpacity>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  btnWide2: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnLabel2: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "rgba(74,74,74,1)",
    textAlign: "center",
    marginTop: 19
  },
  horizontal: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  header: {
    height: 141,
    backgroundColor: "rgba(3,85,73,1)"
  },
  image: {
    width: 329,
    height: 65,
    marginTop: 53,
    paddingRight: 0,
    marginLeft: 23
  },
  title: {
    height: 48,
    backgroundColor: "rgba(55,55,55,1)",
    fontFamily: "roboto-regular",
    fontWeight: 'bold',
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 56
  },
  title2: {
    height: 37,
    marginTop: 5,
    backgroundColor: "rgba(76,76,77,1)",
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 19,
    textAlign: "center",
    lineHeight: 42
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
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 1
  },
  projectContainer: {
    height: 140,
    marginBottom: 10,
    backgroundColor: 'lightgray',
    top: 10
  },
  projectImageContainer: {
    width: '30%',
    height: 140,
    position: 'absolute',
    flexDirection: "row"
  },
  projectInfoContainer: {
    height: 140,
    width: '70%',
    position: 'absolute',
    marginLeft: '30%',
    paddingTop: 12
  },
  projectTitle: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    paddingLeft: 20,
    fontSize: 30
  },
  projectDescription: {
    height: 47,
    paddingLeft: 20,
    paddingRight: 30,
    fontFamily: "roboto-regular",
    color: 'gray',
    fontSize: 15,
    textAlign: "justify"
  },
  projectImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -346
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
