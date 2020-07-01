import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const { height } = Dimensions.get('window');

export default class ProjectDetail extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.Id_project);
    this.state = {
      isLoading: true,
      isRendering: true,
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
    return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_project_by_id&api_key=5183723902398237640&Id_project=' + this.props.navigation.state.params.Id_project)

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
        });

  }

  componentDidUpdate() {

      //call api to get details from project from id
      return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_project_by_id&api_key=5183723902398237640&Id_project=' + this.props.navigation.state.params.Id_project)

          .then(response => response.json())
          .then((responseJson) => {

            if (responseJson.Response == 1){
              this.setState({
                isLoading : false,
                isRendering: false,
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
              console.log("fail conection")
              this.setState({
                isLoading : false,
                dialogFailVisible: true,
              });
            }

          })

          .catch((error) => {
            console.log("fail promess")
            console.log(error)
          });


  }


  render(){

    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {

      console.log('Loading')

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />

        </View>
      </View>

    } else {

      let image = this.state.Image;
      let date = this.state.Date;
      date.substring(0,11);

      return (

          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Image
                  source={require("../assets/images/logosLuTecApp.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
            </View>
            <Text style={styles.title}>Project detail</Text>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >


              <View style={styles.sliderContainer}>
                <SliderBox
                    images={this.state.images}
                    onCurrentImagePressed={index =>
                        console.warn(`image ${index} pressed`)
                    }
                />

                <Text style={styles.nameLabel}>{this.state.projectName}</Text>

                <Text style={styles.label}>Created by: </Text>
                <Text style={styles.label2}>{this.state.Creator}</Text>

                <Text style={styles.label}>Created on</Text>
                <Text style={styles.label2} >{date}</Text>

                <Text style={styles.descriptionProject} >
                  {this.state.projectDescription}
                </Text>

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
  sliderContainer: {
    flex: 1,
    height: 250,
    alignSelf: 'stretch',
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
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
  title: {
    height: 48,
    backgroundColor: "rgba(45,45,45,1)",
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 56
  },
  label: {
    fontFamily: "roboto-regular",
    color: "#595A5C",
    flexDirection: "row",
    marginTop: 15,
    marginLeft: '10%'
  },
  label2: {
    fontFamily: "roboto-regular",
    color: "rgba(15,90,78,1)",
    flexDirection: "row",
    marginLeft: '10%'
  },
  nameLabel: {
    fontFamily: "roboto-regular",
    color: "#595A5C",
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: "row",
    marginTop: 15,
    width: '80%',
    marginLeft: '10%'
  },
  text: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 11,
    marginLeft: 96
  },
  descriptionProject: {
    fontFamily: "roboto-regular",
    color: "#595A5C",
    height: 124,
    width: 314,
    fontSize: 16,
    marginTop: 15,
    textAlign: "justify",
    alignSelf: 'center'
  },
});

