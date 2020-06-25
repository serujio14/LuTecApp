import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from "react-native";

const { height } = Dimensions.get('window');

export default class LuTecApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: [],
      Email: '',
      Id_campus: '',
      Id_rol: '',
      Id_user: '',
      Name: '',
      Password : '',
      Tec_id: '',
    }
  }

  goToEpilogModule(text){

    if (typeof(this.props.navigation.state.params) !== 'undefined' || this.props.navigation.state.params != null) {
      let { navigate } = this.props.navigation;
      if (this.props.navigation.state.params.userData.Id_rol !== "2") {
        navigate("EpilogModule");
      }else {
        navigate("EpilogModuleAdmin");
      }
    } else {
      console.log("id rol 2")
      console.log(this.state.Id_rol)

      let { navigate } = this.props.navigation;
      if (this.state.Id_rol !== "2") {
        navigate("EpilogModule");
      }else {
        navigate("EpilogModuleAdmin");
      }
    }
  }
  goToProjectCreate(text){
    let { navigate } = this.props.navigation;
      navigate("ProjectCreate");
  }

  goToProjectsModule(text){
    let { navigate } = this.props.navigation;
    navigate("ProjectsModule");
  }

  render() {
    if (this.state.isLoading) {

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688"/>

        </View>
      </View>

    } else {

      return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                  source={require("../assets/images/logosLuTecApp.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
              <View style={styles.loginContainer}>
              <Text style={styles.userNameStyle}>{this.props.navigation.state.params.userData.Name}</Text>
              </View>
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
                      onPress={() => this.goToProjectsModule(this.state)}
                      style={styles.btn1}
                  >
                    <Text style={styles.btnLabel2}>Browse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => this.goToProjectCreate(this.state)}
                      style={styles.btn1}
                  >
                    <Text style={styles.btnLabel2}>Create</Text>
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
                <TouchableOpacity
                    onPress={() => this.goToEpilogModule(this.state)}
                    style={styles.btnWide}
                >
                  <Text style={styles.btnLabel}>Open</Text>
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
                <View style={styles.btnWide}>
                  <Text style={styles.btnLabel}>Under development</Text>
                </View>
              </ImageBackground>
            </View>
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
    height: 150,
    backgroundColor: "rgba(3,85,73,1)"
  },
  userNameStyle: {
    width: '90%',
    height: 54,
    textAlign: 'right',
    color: 'white',
    flexDirection: "row"
  },
  btnLogOut: {
    width: '100%',
    height: 54,
    lineHeight: 64,
    color: "rgba(3,85,73,1)",
    textAlign: 'right',
    flexDirection: "row"
  },
  btnWide: {
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
    marginTop: 10,
    textAlign: "center"
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
  moduleContainer: {
    marginTop: 3,
  },
  image: {
    width: 329,
    height: 84,
    marginTop: 30,
    alignSelf: 'center'
  },
  open: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 170
  },
  btn1: {
    width: 188,
    height: 36
  },
  btnGotoProjectsModuleRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 11
  }
});

