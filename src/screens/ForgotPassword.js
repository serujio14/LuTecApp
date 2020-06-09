import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ActivityIndicator} from "react-native";
import LoginTextboxTecID from "../components/LoginTextboxTecID";
import LoginTextboxPassword from "../components/LoginTextboxPassword";
import LoginTextboxConfirmPassword from "../components/LoginTextboxConfirmPassword";


export default class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      TecID : "",
      Password : "",
      PasswordConfirm: "",
      visible : false,
      dialogVisible: false,
      dialogFailVisible: false
    }

    this.handleChangeTextTecID = this.handleChangeTextTecID.bind(this)
    this.handleChangeTextPassword = this.handleChangeTextPassword.bind(this)
    this.handleChangeTextPasswordConfirm = this.handleChangeTextPasswordConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.CheckTextInput = this.CheckTextInput.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  CheckTextInput = () => {

    if(this.state.Password === this.state.PasswordConfirm){
      if (this.state.TecID != ''  &&this.state.Password != ''
          && this.state.PasswordConfirm != '') {
        return true;

      } else {
        return false
      }
    }else{

      return true;

    }
  };

  resetPassword(state) {

    if (this.CheckTextInput()) {

      console.log('adding')

      this.setState({isLoading: true});

      fetch("http://192.168.0.4/lutecapp.com/service.php?who=forgot_password&api_key=5183723902398237640&TecID=" +
          +state.TecID + "&Password=" + state.Password, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
      )
          .then(response => response.json())
          .then((responseJson) => {

            console.log('worked')
            console.log(responseJson)

            if (responseJson.Response == 1) {
              this.setState({
                isLoading: false,
                dialogVisible: true,
                TecID: "",
                Password: "",
                PasswordConfirm: "",
              });
            } else {
              this.setState({
                isLoading: false,
                dialogFailVisible: true,
              });
            }

          })
          .catch((error) => {
            console.log('error')
            console.error(error)
          });
    } else {
      alert('Please Fill All Spaces and Passwords must match');
    }
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleChangeTextTecID(text){
    this.setState({TecID : text})
  }

  handleChangeTextPassword(text){
    this.setState({Password : text})
  }
  handleChangeTextPasswordConfirm(text){
    this.setState({PasswordConfirm : text})
  }

  render() {

    if (this.state.isLoading) {

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />
        </View>
      </View>

    } else {

      return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                  source={require("../assets/images/logosLuTecAppIcon.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
            </View>
            {/* - - - - - - TITLE - - - - - - -*/}
            <Text style={styles.passwordReset}>PASSWORD RESET</Text>

            <Text style={styles.label}>TEC ID</Text>
            <TextInput
                value={this.state.TecID}
                onChangeText={this.handleChangeTextTecID}
                style={styles.textbox}
            />
            <Text style={styles.label}>NEW PASSWORD</Text>
            <TextInput
                value={this.state.Password}
                onChangeText={this.handleChangeTextPassword}
                style={styles.textbox}
            />
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <TextInput
                value={this.state.PasswordConfirm}
                onChangeText={this.handleChangeTextPasswordConfirm}
                style={styles.textbox}
            />

            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => this.resetPassword(this.state)}
                style={styles.btnWide}
            >
              <Text style={styles.btnLabel}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
      );
    }
  }


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
    justifyContent: 'space-around',
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

