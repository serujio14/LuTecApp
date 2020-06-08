import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

function EpilogModuleAdmin(props) {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
              source={require("../assets/images/logosLuTecAppIcon.png")}
              resizeMode="contain"
              style={styles.image}
          ></Image>
        </View>
        <View style={styles.titleEpilog}>
          <Image
              source={require("../assets/images/EpilogLogo1.png")}
              resizeMode="contain"
              style={styles.image2}
          ></Image>
        </View>

        <View style={styles.btnsContainer}>
          <View style={styles.btnItemL}>
            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("AdminAddMaterial")}
            >
              <Text style={styles.btnLabel}>ADD NEW MATERIAL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnItemR}>
            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("AdminEditMaterial")}
            >
              <Text style={styles.btnLabel}>EDIT MATERIAL</Text>
            </TouchableOpacity>
          </View>
        </View>

          {/* - - - - - - BTN - - - - - - -*/}
          <TouchableOpacity
              onPress={() => props.navigation.navigate("LuTecApp")}
              style={styles.btnWide2}
          >
            <Text style={styles.btnLabel}>SELECT MATERIAL</Text>
          </TouchableOpacity>

        <Text style={styles.materialName}>MATERIAL &amp; THICKNESS SELECTED</Text>

        <Text style={styles.title2}>CUTTING CONFIGURATION</Text>
        <View style={styles.itemContainer}>
          <View style={styles.powerBox}>
            <View style={styles.parameterContainer}>
              <Text style={styles.labelParameterNumber}>00</Text>
              <Text style={styles.labelParameter}>POWER</Text>
            </View>
          </View>
          <View style={styles.speedBox}>
            <View style={styles.parameterContainer}>
              <Text style={styles.labelParameterNumber}>00</Text>
              <Text style={styles.labelParameter}>SPEED</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title2}>TRACING CONFIGURATION</Text>
        <View style={styles.itemContainer}>
          <View style={styles.powerBox}>
            <View style={styles.parameterContainer}>
              <Text style={styles.labelParameterNumber}>00</Text>
              <Text style={styles.labelParameter}>POWER</Text>
            </View>
          </View>
          <View style={styles.speedBox}>
            <View style={styles.parameterContainer}>
              <Text style={styles.labelParameterNumber}>00</Text>
              <Text style={styles.labelParameter}>SPEED</Text>
            </View>
          </View>
        </View>

        {/* - - - - - - BTN - - - - - - -*/}
        <TouchableOpacity
            onPress={() => props.navigation.navigate("LuTecApp")}
            style={styles.btnWide}
        >
          <Text style={styles.btnLabel}>GET PARAMETERS</Text>
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
  image: {
    width: 329,
    height: 65,
    marginTop: 53,
    marginLeft: 23
  },
  image2: {
    width: 208,
    height: 72,
    marginLeft: 84
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
  titleEpilog: {
    height: 72,
    backgroundColor: "rgba(76,76,77,1)"
  },
  label2: {
    top: 10,
    textAlign: "center",
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  textbox: {
    marginLeft: 28,
    marginBottom: 30,
    marginRight: 28
  },
  textbox2: {
    marginLeft: 28,
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
    backgroundColor: "rgba(0,150,136,1)",
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnsContainer: {
    height: 54,
    flexDirection: "row",
    marginRight: -3
  },
  btnItemL :{
    width: '50%',
    height: 54,
    backgroundColor: "rgba(63,62,62,1)",
    textAlign: 'center'
  },
  btnItemR :{
    width: '50%',
    height: 54,
    backgroundColor: "rgba(55,55,55,1)",
    textAlign: 'center'
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  },
  btnSelectMaterial: {
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
  },
  selectMaterial: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 6,
    marginLeft: 35
  },
  getParameters: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 130
  },
  powerBox: {
    width: '50%',
    height: 109,
    backgroundColor: "#E6E6E6"
  },
  speedBox: {
    width: '50%',
    height: 109,
    backgroundColor: "#E6E6E6",
    marginLeft: 2
  },
  labelParameterNumber: {
    top: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 62
  },
  labelParameter: {
    top: 72,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 17
  },
  itemContainer: {
    height: 109,
    flexDirection: "row",
    marginRight: -3
  },
  materialName: {
    height: 35,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 45,
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 17
  },
  parameterContainer: {
    height: 92,
    marginTop: 7,
    alignItems: 'center'
  },
});

export default EpilogModuleAdmin;
