import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput} from "react-native";
import LoginTextboxTecID from "../components/LoginTextboxTecID";
import LoginTextboxPassword from "../components/LoginTextboxPassword";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      TecID: "",
      Password: "",
      visible: false,
      dialogVisible: false,
      dialogFailVisible: false
    }
    this.handleChangeTextTecID = this.handleChangeTextTecID.bind(this)
    this.handleChangeTextPassword=this.handleChangeTextPassword.bind(this)
    this.CheckTextInput = this.CheckTextInput.bind(this)

    this.login = this.login.bind(this)
  }

  CheckTextInput = () => {

    if (this.state.TecID != '' && this.state.Password != '') {
      return true;
    } else {
      return false
    }

  };

  login(state) {

    if (this.CheckTextInput()) {

      this.setState({isLoading: true});

      fetch("http://192.168.0.8/lutecapp.com/service.php?who=login&api_key=5183723902398237640&TecId=" + state.TecID + "&Password=" + state.Password, {
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
                Email: "",
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

  handleChangeTextPassword(text){
    this.setState({Password : text})
  }
  handleChangeTextTecID(text){
    this.setState({TecID : text})
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
            <Text style={styles.title}>ACCOUNT LOGIN</Text>
            <Text style={styles.label}>TEC ID</Text>
            <TextInput
                value={this.state.TecID}
                onChangeText={this.handleChangeTextTecID}
                style={styles.textbox}
            />
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
                value={this.state.Password}
                onChangeText={this.handleChangeTextPassword}
                style={styles.textbox}
            />
            <TouchableOpacity
                onPress={() => props.navigation.navigate("ForgotPassword")}
                style={styles.button}
            >
              <Text style={styles.btnWhite}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.login(this.state)}
                style={styles.btnWide}
            >
              <Text style={styles.btnLabel}>LOGIN</Text>
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
    bottom: 0,
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
