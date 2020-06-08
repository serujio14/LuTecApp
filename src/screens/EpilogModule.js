import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

export default class EpilogModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      cutPower : "00",
      cutSpeed: "00",
      tracePower : "00",
      traceSpeed: "00",
    }
  }

  componentDidMount() {

    return fetch('http://192.168.0.4/lutecapp.com/service.php?who=get_materials&api_key=5183723902398237640')

        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.movies,
          })
        })

        .catch((error) => {
          console.log(error)
        });

  }

    render(){

      if (this.state.isLoading) {

        return <View style={styles.containerLoader}>
          <View style={styles.horizontal}>
            <ActivityIndicator size="large" color="#009688" />

          </View>
        </View>

      } else {

        let data = [];

        let materials = this.state.dataSource

        let materialsArray = materials.map((val, key) => {
          const obj = {value:val.title, data : val};
          data.push(obj)
        });

        console.log('data')
        console.log(data)

        return (

            <View style={styles.container}>
              <View style={styles.header}>
                <Image
                    source={require("../assets/images/logosLuTecAppIcon.png")}
                    resizeMode="contain"
                    style={styles.image}
                />
              </View>
              <View style={styles.titleEpilog}>
                <Image
                    source={require("../assets/images/EpilogLogo1.png")}
                    resizeMode="contain"
                    style={styles.image2}
                />
              </View>
              {/* - - - - - - BTN - - - - - - -*/}
              <TouchableOpacity
                  onPress={() => props.navigation.navigate("LuTecApp")}
                  style={styles.btnWide2}
              >
                <Text style={styles.btnLabel}>SELECT MATERIAL</Text>
              </TouchableOpacity>

              <Dropdown
                  style={styles.materialName}
                  label='MATERIAL &amp; THICKNESS SELECTED'
                  data={data}

              />

              <Text style={styles.title2}>CUTTING CONFIGURATION</Text>
              <View style={styles.itemContainer}>
                <View style={styles.powerBox}>
                  <View style={styles.parameterContainer}>
                    <Text style={styles.labelParameterNumber}>{this.state.cutPower}</Text>
                    <Text style={styles.labelParameter}>POWER</Text>
                  </View>
                </View>
                <View style={styles.speedBox}>
                  <View style={styles.parameterContainer}>
                    <Text style={styles.labelParameterNumber}>{this.state.cutSpeed}</Text>
                    <Text style={styles.labelParameter}>SPEED</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.title2}>TRACING CONFIGURATION</Text>
              <View style={styles.itemContainer}>
                <View style={styles.powerBox}>
                  <View style={styles.parameterContainer}>
                    <Text style={styles.labelParameterNumber}>{this.state.tracePower}</Text>
                    <Text style={styles.labelParameter}>POWER</Text>
                  </View>
                </View>
                <View style={styles.speedBox}>
                  <View style={styles.parameterContainer}>
                    <Text style={styles.labelParameterNumber}>{this.state.traceSpeed}</Text>
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
  label: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 28
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
    height: 55,
    marginTop: 10,
    marginBottom: 15,
    lineHeight: 75,
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

