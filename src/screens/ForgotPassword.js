import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ActivityIndicator, Alert, ScrollView, Dimensions, SafeAreaView, StatusBar} from "react-native";
import Dialog from "react-native-dialog";

const { height } = Dimensions.get('window');

export default class ForgotPassword extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

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

    if((this.state.Password === this.state.PasswordConfirm) && (this.state.Password !== ''
        && this.state.PasswordConfirm !== '')){
      if (this.state.TecID !== ''  &&this.state.Password !== ''
          && this.state.PasswordConfirm !== '') {
        return true;

      } else {
        return false
      }
    }else{

      return false;

    }
  };

  resetPassword(state) {

    if (this.CheckTextInput()) {

      console.log('adding')

      this.setState({isLoading: true});

      fetch("http://192.168.0.4/lutecapp.com/service.php?who=forgot_password&api_key=5183723902398237640&TecID="
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

    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />
        </View>
      </View>

    } else {

      return (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >

          <View style={styles.container}>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Password Updated</Dialog.Title>
              <Dialog.Description>
                The password has been updated
              </Dialog.Description>
              <Dialog.Button label="Continue" onPress={this.handleCancel} />
            </Dialog.Container>

            <Dialog.Container visible={this.state.dialogFailVisible}>
              <Dialog.Title>Password not updated</Dialog.Title>
              <Dialog.Description>
                There has been an error updating the password. Please try again
              </Dialog.Description>
              <Dialog.Button label="Continue" onPress={this.handleCancel} />
            </Dialog.Container>

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

          </View>
            </ScrollView>

            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => this.resetPassword(this.state)}
                style={styles.btnWide}
            >
              <Text style={styles.btnLabel}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </SafeAreaView>
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
    marginBottom: 20,
    lineHeight: 56
  },
  label: {
    fontFamily: "roboto-regular",
    color: "#595A5C",
    flexDirection: "row",
    marginTop: 15,
    textAlign: 'center'
  },
  textbox: {
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: 25,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: "center",
    color: 'gray'
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

