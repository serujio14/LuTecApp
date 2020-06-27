import React, { Component } from "react";
import {  StyleSheet,  View,  Text,  Image,  ActivityIndicator,  ScrollView,  Dimensions,  SafeAreaView,  StatusBar} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

const { height } = Dimensions.get('window');

export default class EpilogModule extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight + 246});
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      cutPower : "00",
      cutSpeed: "00",
      tracePower : "00",
      traceSpeed: "00",
      selectedMaterial : []
    }


    this.handleMaterialDropdown = this.handleMaterialDropdown.bind(this)

  }

  handleMaterialDropdown(text){

    const array = Object.values( this.state.dataSource);

    let materials = array.map((val, key) => {

      if (val.Name === text){
        console.log('eureka')
        console.log(val)

        this.setState(
            {
              cutPower : val.CutPower,
              cutSpeed: val.CutSpeed,
              tracePower : val.TracePower,
              traceSpeed: val.TraceSpeed,
            })
      }

    });

  }

  componentDidMount() {

    return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_material_list&api_key=5183723902398237640')

        .then(response => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            dataSource: responseJson.Data,
          })

        })

        .catch((error) => {
          console.log(error)
          console.log(error)
        });
  }

  render(){

    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />
        </View>
      </View>

    } else {

      let data = [];

      const array = Object.values( this.state.dataSource);

      let materials = array.map((val, key) => {

        const obj = {value:val.Name, data : val};
        data.push(obj)
      });
      return (

          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Image
                  source={require("../assets/images/logosLuTecApp.png")}
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
            <Text style={styles.title}>Select material</Text>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
              <View style={styles.container}>
                <View style={styles.materialNameContainer}>
                  <Dropdown
                      style={styles.materialName}
                      label='MATERIAL SELECTED'
                      data={data}
                      onChangeText={this.handleMaterialDropdown}
                  />
                </View>

                <Text style={styles.title2}>Cutting configuration</Text>
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

                <Text style={styles.title2}>Tracing configuration</Text>
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
    justifyContent: 'space-around'
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
  btnWide: {
    width: '100%',
    height: 54,
    marginTop: 15,
    backgroundColor: "rgba(0,150,136,1)",
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  header: {
    height: 150,
    backgroundColor: "rgba(3,85,73,1)"
  },
  image: {
    width: 329,
    height: 84,
    marginTop: 30,
    alignSelf: 'center'
  },
  image2: {
    width: 208,
    height: 72,
    marginLeft: 84
  },
  title: {
    height: 48,
    backgroundColor: "rgba(45,45,45,1)",
    fontFamily: "roboto-regular",
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
    marginBottom: 10,
    marginRight: -3
  },
  materialName: {
    height: 50,
    paddingBottom: 25,
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20
  },
  materialNameContainer: {
    lineHeight: 75,
    width: '90%',
    marginLeft: '5%',
    marginTop: 0,
    marginBottom: 10,
    borderColor: 'gray',
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  parameterContainer: {
    height: 92,
    marginTop: 7,
    alignItems: 'center'
  },
});

