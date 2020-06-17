import React, { Component } from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import MaterialButtonSuccess8 from "../components/MaterialButtonSuccess8";
import { SliderBox } from "react-native-image-slider-box";

export default class ProjectDetail extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.Id_project);
    this.state = {
      isLoading: true,
      dataSource: [],
      projectId: "",
      projectName: "",
      projectDescription: "",
      Image: "",
      Date: new Date(),
      Creator : "",
      selectedMaterial: [],
      images: [
        "https://source.unsplash.com/1024x768/?nature"
      ]
    }

  }

  componentDidMount() {

     //call api to get details from project from id
    return fetch('http://192.168.0.4/lutecapp.com/service.php?who=return_project_by_id&api_key=5183723902398237640&Id_project=' + this.props.navigation.state.params.Id_project)

        .then(response => response.json())
        .then((responseJson) => {
          if (responseJson.Response == 1){
            this.setState({
              isLoading : false,
              dialogVisible: true,
              dataSource: responseJson.Data,
              projectId: responseJson.Data.Id_project,
              projectName: responseJson.Data.Name,
              projectDescription: responseJson.Data.Description,
              Creator: responseJson.Data.Creator,
              Image: responseJson.Data.Image,
              Date: responseJson.Data.Date,
              images: [
                responseJson.Data.Image,
                responseJson.Data.Image2,
                responseJson.Data.Image3,
                responseJson.Data.Image4
              ],
            });
          }else{
            console.log("fallo conexion")
            this.setState({
              isLoading : false,
              dialogFailVisible: true,
            });
          }

        })

        .catch((error) => {
          console.log("fallo la promesa")
          console.log(error)
          console.log(error)
        });

  }


  render(){

    if (this.state.isLoading) {

      console.log('CARGANDO')

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />

        </View>
      </View>

    } else {

      let image = this.state.Image;

      return (

          <View style={styles.container}>
            <SliderBox
                images={this.state.images}
                onCurrentImagePressed={index =>
                    console.warn(`image ${index} pressed`)
                }
            />
            <View style={styles.rect1}>
              <Image
                  source={require("../assets/images/logosLuTecAppIcon.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
            </View>
            <View style={styles.rect2}>
              <Text style={styles.text}>PROJECT DETAIL</Text>
            </View>
            <View style={styles.loremIpsumRow}>
              <Text style={styles.loremIpsum}>{this.state.Name}</Text>
            </View>
            <View style={styles.createdByRow}>
              <Text style={styles.createdBy}>CREATED BY:</Text>
              <Text style={styles.christopher}>{this.state.Creator} </Text>
            </View>
            <View style={styles.materialButtonSuccess9Stack}>
              <MaterialButtonSuccess8
                  style={styles.materialButtonSuccess9}
              />
              <MaterialButtonSuccess8
                  style={styles.materialButtonSuccess10}
              />
            </View>
            <Text style={styles.loremIpsum1}>
              {this.state.Description}
            </Text>
            <View style={styles.dateCreatedRow}>
              <Text style={styles.dateCreated}>DATE CREATED:</Text>
              <Text style={styles.christopher1}></Text>
            </View>
            <View style={styles.rect3}/>
          </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)"
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
  text: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 11,
    marginLeft: 96
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 8
  },
  girasol1: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    fontSize: 35,
    marginLeft: 2
  },
  loremIpsumRow: {
    height: 42,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 28,
    marginRight: 234
  },
  createdBy: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  christopher: {
    fontFamily: "roboto-regular",
    color: "rgba(0,150,136,1)",
    textAlign: "left",
    marginLeft: 6
  },
  createdByRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 211,
    marginLeft: 27,
    marginRight: 97
  },
  materialButtonSuccess9: {
    height: 54,
    width: 188,
    position: "absolute",
    left: 0,
    top: 0
  },
  materialButtonSuccess10: {
    height: 54,
    width: 188,
    position: "absolute",
    left: 0,
    top: 0
  },
  materialButtonSuccess9Stack: {
    width: 188,
    height: 54,
    marginTop: 163,
    marginLeft: -1519
  },
  loremIpsum1: {
    fontFamily: "roboto-regular",
    color: "rgba(51,45,45,1)",
    height: 124,
    width: 314,
    fontSize: 16,
    textAlign: "justify",
    marginTop: -193,
    marginLeft: 31
  },
  dateCreated: {
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  christopher1: {
    fontFamily: "roboto-regular",
    color: "rgba(0,150,136,1)",
    textAlign: "left",
    marginLeft: 5
  },
  dateCreatedRow: {
    height: 16,
    flexDirection: "row",
    marginTop: -145,
    marginLeft: 27,
    marginRight: 184
  },
  rect3: {
    width: 324,
    height: 187,
    backgroundColor: "#E6E6E6",
    marginTop: -240,
    marginLeft: 28
  }
});

