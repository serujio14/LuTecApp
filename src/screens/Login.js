import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput, ScrollView, SafeAreaView, StatusBar, Dimensions} from "react-native";

const { height } = Dimensions.get('window');

export default class Login extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight + 174});
  };

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
      //console.log("http://192.168.0.2/lutecapp.com/service.php?who=login&api_key=5183723902398237640&TecId=" + state.TecID + "&Password=" + state.Password);
      fetch("http://192.168.0.2/lutecapp.com/service.php?who=login&api_key=5183723902398237640&TecId=" + state.TecID + "&Password=" + state.Password, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
      )
          .then(response => response.json())
          .then((responseJson) => {


            console.log(responseJson);
            if (responseJson.Response === 1 && responseJson.Data.ERROR !== "ERROR") {
              //NAVIGATE TO LUTECAPP SCREEN
              let userData = responseJson.Data;
              let { navigate } = this.props.navigation;
              navigate("LuTecApp", {userData});

            } else if (responseJson.Data.ERROR === "ERROR") {
              this.setState({
                isLoading: false,
                dialogFailVisible: true,
              });
              alert('TEC ID or Password Incorrect. Please try again');
            }else{
              this.setState({
                isLoading: false,
                dialogFailVisible: true,
              });
            }

          })
          .catch((error) => {
            console.log('error')
            console.error(error)
            this.setState({
              isLoading: false,
              dialogFailVisible: true,
            });
          });
    } else {
      alert('Please fill all spaces and passwords must match');
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
  goToProjectCreate(text){
    let { navigate } = this.props.navigation;
    navigate("ForgotPassword");

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
            <View style={styles.header}>
              <Image
                  source={require("../assets/images/logosLuTecApp.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
            </View>
            <Text style={styles.title}>Account Login</Text>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >

              <View style={styles.container}>
                <Text style={styles.label}>Tec id</Text>
                <TextInput
                    value={this.state.TecID}
                    keyboardType = 'numeric'
                    maxLength={9}
                    secureTextEntry={false}
                    onChangeText={this.handleChangeTextTecID}
                    style={styles.textbox}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={this.state.Password}
                    onChangeText={this.handleChangeTextPassword}
                    style={styles.textbox}
                />

                <View style={styles.btnContainer}>
                <TouchableOpacity
                    //onPress={() => props.navigation.navigate("ForgotPassword")}
                    onPress={() => this.goToProjectCreate(this.state)}
                    style={styles.btnWhite}
                >
                  <Text style={styles.btnLabelW}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.login(this.state)}
                    style={styles.btnWide}
                >
                  <Text style={styles.btnLabel}>Login</Text>
                </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
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
    height: 120,
    backgroundColor: "rgba(3,85,73,1)"
  },
  image: {
    width: 329,
    height: 64,
    marginTop: 30,
    alignSelf: 'center'
  },
  title: {
    height: 48,
    backgroundColor: "rgba(45,45,45,1)",
    fontFamily: "roboto-regular",
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
    width: '80%',
    alignSelf:'center',
    marginBottom: 25,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: "center",
    color: 'gray'
  },
  btnContainer: {
    width: '100%',
    height: 108,
    backgroundColor: "rgba(0,150,136,1)"
  },
  btnWide: {
    width: '100%',
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
    alignSelf: 'stretch',
    flexDirection: "row",
    textAlign: 'center'
  },
  btnWhite: {
    width: '100%',
    height: 54,
    flexDirection: "row",
    color: "rgba(0,150,136,1)",
    backgroundColor: "rgba(215,215,215,1)",
  },
  btnLabel: {
    width: '100%',
    textAlign: "center",
    alignSelf: 'center',
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)"
  },
  btnLabelW: {
    width: '100%',
    textAlign: "center",
    alignSelf: 'center',
    fontFamily: "roboto-regular",
    color: "rgba(0,150,136,1)"
  }
});
