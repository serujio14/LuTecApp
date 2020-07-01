import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, ScrollView, Dimensions, SafeAreaView, StatusBar} from "react-native";

const { height } = Dimensions.get('window');

export default class ProjectsModule extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight + 174});
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      projectId: "",
      projectName: "",
      projectDescription: "",
      Image: "",
      Date: new Date(),
      selectedMaterial: []
    }

    this.goToProject = this.goToProject.bind(this)
  }

  goToProject(text){

    console.log('gotoproject: ' + text);

    this.state = {
      projectId: text
    }
    let Id_project = this.state.projectId;
    let { navigate } = this.props.navigation;
    navigate("ProjectDetail", {Id_project});

  }

  componentDidMount() {

    return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_project_list&api_key=5183723902398237640')

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

  componentDidUpdate() {

    return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_project_list&api_key=5183723902398237640')

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

      console.log('CARGANDO')

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />

        </View>
      </View>

    } else {

      let data = [];

      const array = Object.values(this.state.dataSource);

      let projects = array.map((val, key) => {

        return (

            <View key={val.Id_project} style={styles.projectContainer}>
              <View style={styles.projectDataContainer}>
                <View style={styles.projectImageContainer}>
                  <Image
                      source={{uri: val.Image}}
                      resizeMode="cover"
                      style={styles.projectImage}
                  />
                </View>
                <View style={styles.projectInfoContainer}>
                  <Text style={styles.projectTitle}>{val.Name}</Text>
                  <Text multiline={true} style={styles.projectDescription}>
                    {val.Description}
                  </Text>
                  <TouchableOpacity
                      onPress={() => this.goToProject(val.Id_project)}
                      style={styles.btnWide2}
                  >
                    <Text style={styles.btnLabel2}>View project detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

        )
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
            <Text style={styles.title}>Developed Projects</Text>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
              <View style={styles.container}>
                {/*render all the projects*/}
                {projects}
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
    backgroundColor: "rgba(241,244,247,1)",
    textAlign: 'center'
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  btnWide2: {
    width: 140,
    height: 30,
    position: 'absolute',
    backgroundColor: "#199F93",
    borderRadius: 8,
    right: 6,
    bottom: 8
  },
  btnLabel2: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    textAlign: "center"
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
    marginBottom: 10,
    lineHeight: 56
  },
  btnViewProject: {
    width: 376,
    height: 36,
    backgroundColor: "rgba(55,65,55,1)",
    marginTop: 346
  },
  viewProject: {
    fontFamily: "roboto-regular",
    marginTop: 10,
    marginLeft: 140
  },
  projectContainer: {
    height: 150,
    marginVertical: 2
  },
  projectDataContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E5E4',
    backgroundColor: 'white',
    height: 140,
    alignSelf: 'center'
  },
  projectImageContainer: {
    width: '30%',
    height: 137,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: "row"
  },
  projectInfoContainer: {
    height: 140,
    width: '70%',
    position: 'absolute',
    marginLeft: '30%',
    paddingTop: 12
  },
  projectTitle: {
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    paddingLeft: 20,
    fontSize: 30
  },
  projectDescription: {
    height: 47,
    paddingLeft: 20,
    paddingRight: 30,
    fontFamily: "roboto-regular",
    color: 'gray',
    fontSize: 15,
    textAlign: "justify"
  },
  projectImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -346
  },
  rect2: {
    width: 376,
    height: 48,
    backgroundColor: "rgba(76,76,77,1)"
  },
  developedProjects: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 9,
    marginLeft: 62
  }
});
