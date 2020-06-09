import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, TextInput} from "react-native";
import MaterialFixedLabelTextbox9 from "../components/MaterialFixedLabelTextbox9";
import MaterialFixedLabelTextbox10 from "../components/MaterialFixedLabelTextbox10";
import MaterialFixedLabelTextbox11 from "../components/MaterialFixedLabelTextbox11";
import Dialog from "react-native-dialog";
import DatePicker from 'react-native-datepicker'

export default class ProjectCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      projectName : "",
      projectDetail : "",
      projectDate: new Date(),
      visible : false,
      dialogVisible: false,
      dialogFailVisible: false
    }

    this.handleChangeTextProjectName = this.handleChangeTextProjectName.bind(this)
    this.handleChangeTextProjectDate = this.handleChangeTextProjectDate.bind(this)
    this.handleChangeTextProjectDetail = this.handleChangeTextProjectDetail.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.createProject = this.createProject.bind(this)
    this.CheckTextInput = this.CheckTextInput.bind(this)
  }

  CheckTextInput = () => {

    if (this.state.projectName != '' && this.state.projectDetail != '' && this.state.projectDate != '') {

      return true;

    } else {
      return false
    }
  };
  createProject(state){

    if (this.CheckTextInput()){

      console.log('agregando')

      this.setState({ isLoading: true });

      fetch("http://192.168.0.8/lutecapp.com/service.php?who=create_project&api_key=5183723902398237640&projectName=" +
          + state.projectName +"&projectDetail=" + state.projectDetail + "&projectDate=" +  state.projectDate , { headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },}
      )
          .then(response => response.json())
          .then((responseJson) => {

            console.log('funciono')
            console.log(responseJson)

            if (responseJson.Response == 1){
              this.setState({
                isLoading : false,
                dialogVisible: true,
                projectName : "",
                projectDetail : "",
                projectDate: "",
              });
            }else{
              this.setState({
                isLoading : false,
                dialogFailVisible: true,
              });
            }

          })
          .catch((error) => {
            console.log('error')
            console.error(error)
          });
    }else{
      alert('Please Fill All Spaces');
    }
  }
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleChangeTextProjectName(text){
    this.setState({projectName : text})
  }
  handleChangeTextProjectDate(text){
    this.setState({projectDate : text})
  }

  handleChangeTextProjectDetail(text){
    this.setState({projectDetail : text})
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
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Project Added</Dialog.Title>
              <Dialog.Description>
                The new project has been added
              </Dialog.Description>
              <Dialog.Button label="Continue" onPress={this.handleCancel} />
            </Dialog.Container>

            <Dialog.Container visible={this.state.dialogFailVisible}>
              <Dialog.Title>Project Not Added</Dialog.Title>
              <Dialog.Description>
                There has been an error adding the project. Please try again
              </Dialog.Description>
              <Dialog.Button label="Continue" onPress={this.handleCancel} />
            </Dialog.Container>
            <View style={styles.btnCreateProjectStack}>
              <TouchableOpacity
                  onPress={() => props.navigation.navigate("ProjectsModule")}
                  style={styles.btnCreateProject}
              >
                <Text style={styles.createProject2}>CREATE PROJECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => this.createProject(this.state)}
                  style={styles.btnUploadImg}
              >
                <Text style={styles.uploadImage}>UPLOAD IMAGE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rect1}>
              <Image
                  source={require("../assets/images/logosLuTecAppIcon.png")}
                  resizeMode="contain"
                  style={styles.image}
              />
            </View>
            <View style={styles.rect2}>
              <Text style={styles.createProject}>CREATE PROJECT</Text>
            </View>
            <View style={styles.loremIpsumStack}>
              <Text style={styles.loremIpsum}></Text>
              <View style={styles.projectNameStack}>
                <Text style={styles.projectName}>PROJECT NAME</Text>
                <TextInput
                    value={this.state.projectName}
                    onChangeText={this.handleChangeTextProjectName}
                    style={styles.textbox}
                />
              </View>
            </View>
            <Text style={styles.projectDate}>PROJECT DATE</Text>
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2020-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 20
                  },
                  dateInput: {
                    marginLeft: 50
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.handleChangeTextProjectDetail(date)}}
            />
            <Text style={styles.projectDescription}>PROJECT DESCRIPTION</Text>

            <TextInput
                value={this.state.projectDetail}
                onChangeText={this.handleChangeTextProjectDetail}
                style={styles.textbox}
            />
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
    bottom:0,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
  },
  btnCreateProject: {
    top: 0,
    left: 187,
    width: 188,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(0,150,136,1)"
  },
  createProject2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 37
  },
  btnUploadImg: {
    top: 0,
    left: 0,
    width: 188,
    height: 54,
    position: "absolute",
    backgroundColor: "rgba(74,74,74,1)"
  },
  uploadImage: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 45
  },
  btnCreateProjectStack: {
    width: 375,
    height: 54,
    marginTop: 698
  },
  rect1: {
    width: 376,
    height: 141,
    backgroundColor: "rgba(3,85,73,1)",
    marginTop: -752
  },
  rect2: {
    width: 376,
    height: 48,
    backgroundColor: "rgba(76,76,77,1)"
  },
  createProject: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 88
  },
  loremIpsum: {
    top: 4,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  projectName: {
    top: 0,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox9: {
    height: 43,
    width: 324,
    position: "absolute",
    left: 0,
    top: 15
  },
  projectNameStack: {
    top: 0,
    left: 0,
    width: 324,
    height: 58,
    position: "absolute"
  },
  loremIpsumStack: {
    width: 324,
    height: 58,
    marginTop: 27,
    marginLeft: 28
  },
  projectDate: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 33,
    marginLeft: 30
  },
  projectDescription: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 77,
    marginLeft: 30
  },
  materialFixedLabelTextbox10: {
    height: 43,
    width: 324,
    marginTop: -93,
    marginLeft: 28
  },
  materialFixedLabelTextbox11: {
    height: 43,
    width: 324,
    marginTop: 50,
    marginLeft: 28
  }
});

