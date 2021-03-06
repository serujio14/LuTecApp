import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, StatusBar } from "react-native";

const { height } = Dimensions.get('window');

function Main(props) {
  return (
    <View style={styles.container}>
          <Image
            source={require("../assets/images/LogoWLuTecAPP.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={styles.luTecText}>
            LuTec contempla colaboradores que crean proyectos de distintos
            grados de dificultad para generar interés tecnológico en niños de áreas rurales,
            documentando el proceso de creación para su comprensión y eventual reproducción.
          </Text>
          <Image
            source={require("../assets/images/LogoTecW.png")}
            resizeMode="contain"
            style={styles.image2}
          ></Image>

      <View style={styles.btnContainer}>
        <View style={styles.btnLogin}>
          <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.btnLabel}>Login</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.btnCreateAccount}>
      <TouchableOpacity
          onPress={() => props.navigation.navigate("CreateAccount")}
      >
        <Text style={styles.btnLabel1}>Create account</Text>
      </TouchableOpacity>
    </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
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
    marginLeft: 28,
    marginRight: 306
  },
  textbox: {
    marginLeft: 28,
    marginRight: 28
  },
  luTecText: {
    fontFamily: "roboto-regular",
    color: "rgba(253,253,253,1)",
    fontSize: 16,
    padding: '10%',
    textAlign: "justify"
  },
  btnContainer :{
    width: '100%',
    height: 96,
    bottom: 30,
    position: 'absolute'
  },
  btnLogin :{
    width: '100%',
    height: 48,
    backgroundColor: "rgba(45,45,45,1)",
    lineHeight: 56
  },
  btnCreateAccount :{
    width: '100%',
    height: 48,
    lineHeight: 56
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    fontSize: 24,
    color: "rgba(251,251,251,1)",
    textAlign: "center",
    marginTop: 8
  },
  btnLabel1: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "rgba(251,251,251,1)",
    textAlign: "center",
    marginTop: 15
  },
  image: {
    width: '100%',
    height: '30%',
    marginTop: 63,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image2: {
    height: 40,
    marginLeft: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  btnGotoCreateAccount: {
    width: 188,
    height: 54,
    backgroundColor: "#E6E6E6",
    marginTop: 16
  },
  createAccount: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 19,
    marginLeft: 35
  },
  btnGotoLogin: {
    top: 699,
    left: 188,
    width: 188,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(0,150,136,1)"
  },
  login: {
    fontFamily: "roboto-regular",
    color: "rgba(253,253,253,1)",
    marginTop: 19,
    marginLeft: 74
  },
});

export default Main;
