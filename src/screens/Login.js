import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import LoginTextboxTecID from "../components/LoginTextboxTecID";
import LoginTextboxPassword from "../components/LoginTextboxPassword";

function Login(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
            source={require("../assets/images/logosLuTecAppIcon.png")}
            resizeMode="contain"
            style={styles.image}
        ></Image>
      </View>
      <Text style={styles.title}>ACCOUNT LOGIN</Text>
      <Text style={styles.label}>TEC ID</Text>
      <LoginTextboxTecID
        style={styles.textbox}
      ></LoginTextboxTecID>
      <Text style={styles.label}>PASSWORD</Text>
      <LoginTextboxPassword
        style={styles.textbox}
      ></LoginTextboxPassword>
      <TouchableOpacity
          onPress={() => props.navigation.navigate("ForgotPassword")}
          style={styles.button}
      >
        <Text style={styles.btnWhite}>FORGOT PASSWORD?</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => props.navigation.navigate("LuTecApp")}
          style={styles.btnWide}
      >
        <Text style={styles.btnLabel}>LOGIN</Text>
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
    marginRight: 28
  },
  btnWide: {
    width: '100%',
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
    position: 'absolute',
    bottom:0,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnWhite: {
    marginTop: 15,
    height: 54,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: "rgba(255,255,255,1)",
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  }
});

export default Login;
