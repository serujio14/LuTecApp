import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from "react-native";

function LuTecApp(props) {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
              source={require("../assets/images/logosLuTecAppIcon.png")}
              resizeMode="contain"
              style={styles.image}
          ></Image>
        </View>

        <View style={styles.moduleContainer}>

          {/* - - - - - - PROJECTS MODULE - - - - - - -*/}
          <ImageBackground
              source={require("../assets/images/imgProjects.jpg")}
              resizeMode="contain"
              style={styles.imgModule}
          >
            <View style={styles.titlesModuleContainer}>
              <Text style={styles.titleModule}>Projects</Text>
              <Text style={styles.labelModule}>Developed LuTec projects</Text>
            </View>
            <View style={styles.btnGotoProjectsModuleRow}>
              {/* - - - - - - BTN - - - - - - -*/}
              <TouchableOpacity
                  onPress={() => props.navigation.navigate("ProjectsModule")}
                  style={styles.btnGotoProjectsModule}
              >
                <Text style={styles.btnLabel3}>BROWSE</Text>
              </TouchableOpacity>
              {/* - - - - - - BTN - - - - - - -*/}
              <TouchableOpacity
                  onPress={() => props.navigation.navigate("ProjectCreate")}
                  style={styles.btnWide3}
              >
                <Text style={styles.btnLabel3}>CREATE</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* - - - - - - EPILOG MODULE - - - - - - -*/}
          <ImageBackground
              source={require("../assets/images/imgEpilog.jpg")}
              resizeMode="contain"
              style={styles.imgModule}
          >
            <View style={styles.titlesModuleContainer}>
              <Text style={styles.titleModule}>Epilog laser cutter</Text>
              <Text style={styles.labelModule}>Epilog machine configuration parameters</Text>
            </View>
            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("EpilogModule")}
                style={styles.btnWide2}
            >
              <Text style={styles.btnLabel2}>OPEN</Text>
            </TouchableOpacity>
          </ImageBackground>

          {/* - - - - - - 3D PRINTER MODULE - - - - - - -*/}
          <ImageBackground
              source={require("../assets/images/img3D.jpg")}
              resizeMode="contain"
              style={styles.imgModule}
          >
            <View style={styles.titlesModuleContainer}>
              <Text style={styles.titleModule}>MakerBot 3D printer</Text>
              <Text style={styles.labelModule}>MakerBot configuration parameters</Text>
            </View>
            <View style={styles.btnWide2}>
              <Text style={styles.btnLabel2}>UNDER DEVELOPMENT</Text>
            </View>
          </ImageBackground>
        </View>

        <TouchableOpacity
            onPress={() => props.navigation.navigate("Main")}
            style={styles.btnWide}
        >
          <Text style={styles.btnLabel}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  header: {
    height: 141,
    backgroundColor: "rgba(3,85,73,1)"
  },
  title: {
    height: 48,
    backgroundColor: "rgba(76,76,77,1)",
    fontFamily: "roboto-regular",
    fontWeight: 'bold',
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 56
  },
  label: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 28
  },
  textbox: {
    marginLeft: 28,
    marginBottom: 30,
    marginRight: 28
  },
  btnWide: {
    width: '100%',
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
    position: 'absolute',
    bottom: 0,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnWide2: {
    width: '100%',
    height: 54,
    lineHeight: 64,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnWide3: {
    width: '50%',
    height: 54
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  },
  btnLabel2: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  },
  btnLabel3: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    textAlign: "center"
  },
  btnLogOut: {
    top: 181,
    left: 0,
    width: 376,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(74,74,74,1)"
  },
  logOut: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 160
  },
  imgModule: {
    top: 0,
    left: 0,
    height: 183
  },
  labelModule: {
    top: 39,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15
  },
  titleModule: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 35
  },
  titlesModuleContainer: {
    width: 319,
    height: 57,
    marginTop: 71,
    marginLeft: 27
  },
  btnGotoMakerBot: {
    width: 376,
    height: 36,
    backgroundColor: "rgba(65,55,55,1)",
    marginTop: 12
  },
  underDevelopment: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 115
  },
  moduleContainer: {
    marginTop: 3,
  },
  image: {
    width: 329,
    height: 65,
    marginTop: 53,
    marginLeft: 23
  },
  epilogLaserCutter: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 35,
    marginTop: 66,
    marginLeft: 27
  },
  loremIpsum3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15
  },
  loremIpsum5: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 15
  },
  loremIpsum3Stack: {
    width: 224,
    height: 18,
    marginLeft: 28
  },
  btnGotoEpilog: {
    width: 376,
    height: 36,
    backgroundColor: "rgba(61,55,65,1)",
    marginTop: 10
  },
  open: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 170
  },
  image5: {
    width: 376,
    height: 173,
    marginTop: -356
  },
  btnGotoProjectsModule: {
    width: 188,
    height: 36
  },
  browse: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 66
  },
  create: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 68
  },
  btnGotoProjectsModuleRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 11
  }
});

export default LuTecApp;
