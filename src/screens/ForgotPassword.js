import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import LoginTextboxTecID from "../components/LoginTextboxTecID";
import LoginTextboxPassword from "../components/LoginTextboxPassword";
import LoginTextboxConfirmPassword from "../components/LoginTextboxConfirmPassword";

function ForgotPassword(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
            source={require("../assets/images/logosLuTecAppIcon.png")}
            resizeMode="contain"
            style={styles.image}
        ></Image>
      </View>
      {/* - - - - - - TITLE - - - - - - -*/}
      <Text style={styles.passwordReset}>PASSWORD RESET</Text>

      <Text style={styles.label}>TEC ID</Text>
      <LoginTextboxTecID
          style={styles.textbox}
      ></LoginTextboxTecID>
      <Text style={styles.label}>NEW PASSWORD</Text>
      <LoginTextboxPassword
        style={styles.textbox}
      ></LoginTextboxPassword>
      <Text style={styles.label}>CONFIRM PASSWORD</Text>
      <LoginTextboxConfirmPassword
        style={styles.textbox}
      ></LoginTextboxConfirmPassword>

      {/* - - - - - - BTN - - - - - - -*/}
      <TouchableOpacity
          onPress={() => props.navigation.navigate("LuTecApp")}
          style={styles.btnWide}
      >
        <Text style={styles.btnLabel}>RESET PASSWORD</Text>
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
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  },
  passwordReset: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 11,
    marginLeft: 88
  },
});

export default ForgotPassword;
