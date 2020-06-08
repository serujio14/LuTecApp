import React, { Component } from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import AdminAddMaterialTextboxName from "../components/AdminAddMaterialTextboxName";
import AdminAddMaterialTextboxCutPower from "../components/AdminAddMaterialTextboxCutPower";
import AdminAddMaterialTextboxCutSpeed from "../components/AdminAddMaterialTextboxCutSpeed";
import AdminAddMaterialTextboxTracePower from "../components/AdminAddMaterialTextboxTracePower";
import AdminAddMaterialTextboxTraceSpeed from "../components/AdminAddMaterialTextboxTraceSpeed";



export default class AdminAddMaterial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      materialName : null,
      cutPower : null,
      cutSpeed: null,
      tracePower : null,
      traceSpeed: null,
    }
      this.handleChange= this.handleChange.bind(this);
  }

    handleChange(event = {}) {
      console.log('camina pueblo de dios')

        const name = event.target && event.target.name;
        const value = event.target && event.target.value;

        this.setState({[name]: value});
    }

  componentDidMount() {

    return fetch('https://facebook.github.io/react-native/movies.json')

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

  render() {

      function updateInputValue(evt) {
          console.log('alo')

          this.setState({
              materialName: evt.target.value
          });
      }

      function addMaterial(state) {
          console.log('llego')

          console.log(state)
      }

      if (this.state.isLoading) {

      console.log('CARGANDO--------------------------------------------------------------------')

      return <View style={styles.container}>
        <Text style={styles.selectMaterial}>CARGANDO</Text>
      </View>

    } else{
      let movies = this.state.dataSource.map((val, key) => {
        return <View key = {key} style={styles.container}>
                <Text> {val.title} </Text>

              </View>
      });

      return (

          <View style={styles.container}>

              {/* - - - - - - BTN - - - - - - -*/}
              <TouchableOpacity
                  onPress={() => addMaterial(this.state)}

                  style={styles.btnAddMaterial}
              >
                  <Text style={styles.addMaterial2}>ADD MATERIAL</Text>
              </TouchableOpacity>

            <View style={styles.group3}>
              <View style={styles.rect5}>
                <Text style={styles.tracingParameters}>TRACING PARAMETERS</Text>
              </View>
            </View>
            <View style={styles.rect1}>
              <Image
                  source={require("../assets/images/logosLuTecAppIcon.png")}
                  resizeMode="contain"
                  style={styles.image}
              ></Image>
            </View>
            <View style={styles.rect2}>
              <Text style={styles.addMaterial}>ADD MATERIAL</Text>
            </View>
            <View style={styles.loremIpsumRow}>
              <Text style={styles.loremIpsum}></Text>
              <Text style={styles.materialName}>MATERIAL NAME & THICKNESS</Text>
            </View>
            <AdminAddMaterialTextboxName
                name="materialName"
                onChange={evt => updateInputValue(evt)}
                value={this.state.materialName}
                style={styles.textbox}
            ></AdminAddMaterialTextboxName>
            <View style={styles.materialFixedLabelTextbox3StackRow}>
              <View style={styles.materialFixedLabelTextbox3Stack}>
                <AdminAddMaterialTextboxCutPower
                    style={styles.textbox}
                ></AdminAddMaterialTextboxCutPower>
                <Text style={styles.power1}>POWER</Text>
              </View>
              <View style={styles.materialFixedLabelTextbox4Stack}>
                <AdminAddMaterialTextboxCutSpeed
                    style={styles.textbox}
                ></AdminAddMaterialTextboxCutSpeed>
                <Text style={styles.speed3}>SPEED</Text>
              </View>
            </View>
            <View style={styles.power2ColumnRow}>
              <View style={styles.power2Column}>
                <Text style={styles.power2}>POWER</Text>
                <AdminAddMaterialTextboxTracePower
                    style={styles.textbox}
                ></AdminAddMaterialTextboxTracePower>
              </View>
              <View style={styles.speed2Stack}>
                <Text style={styles.speed2}>SPEED</Text>
                <AdminAddMaterialTextboxTraceSpeed
                    style={styles.textbox}
                ></AdminAddMaterialTextboxTraceSpeed>
              </View>
            </View>
            <View style={styles.group4}>
              <View style={styles.rect4}>
                <Text style={styles.cuttingParameters}>CUTTING PARAMETERS</Text>
              </View>
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
        height: 141,
        backgroundColor: "rgba(3,85,73,1)"
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item :{
        flex: 0.5,
        height: 120,
        padding: 10
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
        backgroundColor: "rgba(76,76,77,1)",
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 19,
        textAlign: "center",
        lineHeight: 42
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
    label2: {
        top: 10,
        textAlign: "center",
        fontFamily: "roboto-regular",
        color: "#121212",
    },
    textbox: {
      width: '100%',
        backgroundColor: 'red',
        color: 'white',
        marginLeft: 28,
        marginBottom: 30
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
  btnAddMaterial: {
    width: 376,
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
    marginTop: 692
  },
  addMaterial2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 140
  },
  group3: {
    width: 376,
    height: 37,
    marginTop: -207
  },
  rect5: {
    width: 376,
    height: 37,
    backgroundColor: "rgba(76,76,77,1)"
  },
  tracingParameters: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 19,
    textAlign: "center",
    marginTop: 7,
    marginLeft: 86
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -577
  },
  image: {
    width: 329,
    height: 65,
    marginTop: 53,
    marginLeft: 23
  },
  rect2: {
    width: 376,
    height: 48,
    backgroundColor: "rgba(76,76,77,1)"
  },
  addMaterial: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 11,
    marginLeft: 106
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 4
  },
  materialName: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 2
  },
  loremIpsumRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 28
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 330,
    marginLeft: 21
  },
  thickness: {
    top: 0,
    left: 9,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox1: {
    height: 43,
    width: 330,
    position: "absolute",
    left: 0,
    top: 16
  },
  thicknessStack: {
    width: 330,
    height: 59,
    marginTop: 31,
    marginLeft: 21
  },
  materialFixedLabelTextbox3: {
    height: 43,
    width: 143,
    position: "absolute",
    left: 0,
    top: 15
  },
  power1: {
    top: 0,
    left: 41,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox3Stack: {
    width: 143,
    height: 58
  },
  materialFixedLabelTextbox4: {
    height: 43,
    width: 151,
    position: "absolute",
    left: 0,
    top: 15
  },
  speed3: {
    top: 0,
    left: 49,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox4Stack: {
    width: 151,
    height: 58,
    marginLeft: 28
  },
  materialFixedLabelTextbox3StackRow: {
    height: 58,
    flexDirection: "row",
    marginTop: 235,
    marginLeft: 27,
    marginRight: 26
  },
  power2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 43
  },
  materialFixedLabelTextbox2: {
    height: 43,
    width: 150,
    marginTop: 1
  },
  power2Column: {
    width: 150
  },
  speed2: {
    top: 0,
    left: 49,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox5: {
    height: 43,
    width: 150,
    position: "absolute",
    left: 0,
    top: 16
  },
  speed2Stack: {
    width: 150,
    height: 59,
    marginLeft: 28,
    marginTop: 2
  },
  power2ColumnRow: {
    height: 61,
    flexDirection: "row",
    marginTop: -209,
    marginLeft: 24,
    marginRight: 23
  },
  group4: {
    width: 376,
    height: 37,
    marginTop: -119
  },
  rect4: {
    width: 376,
    height: 37,
    backgroundColor: "rgba(76,76,77,1)"
  },
  cuttingParameters: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 19,
    textAlign: "center",
    marginTop: 7,
    marginLeft: 86
  }
});