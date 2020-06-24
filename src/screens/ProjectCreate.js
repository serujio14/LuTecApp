import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, Alert, TextInput, ScrollView, Dimensions, SafeAreaView, StatusBar, Platform} from "react-native";
import Dialog from "react-native-dialog";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

const { height } = Dimensions.get('window');

export default class ProjectCreate extends Component {

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight + 174});
  };

  constructor(props) {
    super(props);
    let dt;
    Moment.locale('en');
    dt = new Date();
    dt = Moment(dt).format('d MMM YYYY');

    let years = new Date();
    years = Moment(years).subtract(5, 'year').format('YYYY-MM-DD'); // for specific format

    this.state = {
      isLoading: false,
      dataSource: null,
      projectName : "",
      projectDetail : "",
      projectCreator : "",
      projectDate: new Date(),
      txtProjectDate: dt,
      textProjectDate: new Date(),
      visible : false,
      dialogVisible: false,
      dialogFailVisible: false,
      dialogImageUpload: false,
      minDate5years : years,
      image: '',
      imageBase64: '',
    }

    this.handleChangeTextProjectName = this.handleChangeTextProjectName.bind(this)
    this.handleChangeTextProjectDate = this.handleChangeTextProjectDate.bind(this)
    this.handleChangeTextProjectDetail = this.handleChangeTextProjectDetail.bind(this)
    this.handleChangeTextProjectCreator = this.handleChangeTextProjectCreator.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.createProject = this.createProject.bind(this)
    this.CheckTextInput = this.CheckTextInput.bind(this)
  }

  async componentDidMount() {
    await this.iosImagePickerPermission();
  }

  iosImagePickerPermission = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  CheckTextInput = () => {

    if (this.state.projectName != '' && this.state.projectDetail != '' && this.state.projectDate != ''&& this.state.projectCreator != '') {

      return true;

    } else {
      return false
    }
  };

  createProject(state){

    if (this.CheckTextInput()){

      this.setState({ isLoading: true });

      fetch("http://192.168.0.2/lutecapp.com/service.php?who=create_project&api_key=5183723902398237640&projectName="
          + state.projectName +"&projectDetail=" + state.projectDetail + "&projectDate=" +  state.txtProjectDate + "&projectCreator=" +  state.projectCreator, { headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },}
      )
          .then(response => response.json())
          .then((responseJson) => {

            if (responseJson.Response == 1){
              let dt;
              Moment.locale('en');
              dt = new Date();
              dt = Moment(dt).format('d MMM YYYY');
              this.setState({
                isLoading : false,
                dialogVisible: true,
                projectName : "",
                projectCreator : "",
                projectDetail : "",
                projectDate: new Date(),
                txtProjectDate: dt,
                textProjectDate: new Date(),
                dialogFailVisible: false,

              });

              let { navigate } = this.props.navigation;
              navigate("LuTecApp");
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
      Alert.alert("Error", "Please Fill All Spaces and Passwords must match");
    }
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleChangeTextProjectName(text){
    this.setState({projectName : text})
  }

  handleChangeTextProjectDate(text){
    this.setState(
        {projectDate : text,
          txtProjectDate: text}
    )
  }

  handleChangeTextProjectCreator(text){
    this.setState({projectCreator : text})
  }

  handleChangeTextProjectDetail(text){
    this.setState({projectDetail : text})
  }

  encodeQueryData = (data) => {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

  pickImage = async () => {
    this.setState({ dialogImageUpload: false });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const { uri, base64 } = result;
      this.setState({ image: uri, imageBase64: base64 });
      console.log('pickImage', result);
    }
  };

  openCamera = () => {
    this.setState({ dialogImageUpload: false });
    this.props.navigation.navigate('ExpoCamera', {
      setImage: ({ uri, base64 }) => this.setState({ image: uri, imageBase64: base64 })
    });
  }

  createProjectByFormData = async () => {
    const {
      projectName,
      projectDetail,
      textProjectDate,
      projectCreator,
      image
    } = this.state;

    if (image.length) {
      const uriPathArr = image.split('/');
      filename = uriPathArr[uriPathArr.length - 1];
      extension = filename.split('.');
      extension = extension[1];
      type = `image/${extension}`;

      const imageData = {
        name: filename,
        uri: image,
        type,
      };

      const formData = new FormData;
      formData.append('file', imageData);

      const params = {
        who: 'create_project',
        api_key: '5183723902398237640',
        projectDate: textProjectDate,
        projectName,
        projectDetail,
        projectCreator
      };

      const urlParam = this.encodeQueryData(params);
      const url = `http://192.168.0.2/lutecapp.com/service.php${urlParam}`;
      // const url = `https://postman-echo.com/post?${urlParam}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('createProjectByFormData', response);
      } catch (error) {
        console.log('error at createProjectByFormData', error);
      }
    }

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
            <Text style={styles.title}>Create Project</Text>
            <StatusBar barStyle="light-content" backgroundColor="#468189" />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
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

                <Dialog.Container
                  visible={this.state.dialogImageUpload}
                  onBackdropPress={() => this.setState({ dialogImageUpload: false })}
                >
                  <Dialog.Button label="From Camera" onPress={this.openCamera} />
                  <Dialog.Button label="From File" onPress={this.pickImage} />
                </Dialog.Container>

                <Text style={styles.label}>Project date</Text>
                <DatePicker
                    style={styles.datePickerContainer}
                    date={this.state.date}
                    mode="date"
                    placeholder={this.state.txtProjectDate}
                    value= {this.state.txtProjectDate}
                    format="DD MMM YYYY"
                    minDate = {this.state.minDate5years}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        marginRight: 3,
                        top: 4
                      },
                      dateInput: {
                        marginLeft: 50
                      }
                    }}
                    onDateChange={(date) => {this.handleChangeTextProjectDate(date)}}
                />

                <Text style={styles.label}>Project name</Text>
                <TextInput
                    value={this.state.projectName}
                    onChangeText={this.handleChangeTextProjectName}
                    style={styles.textbox}
                />

                <Text style={styles.label}>Project creator(s)</Text>
                <TextInput
                    value={this.state.projectCreator}
                    onChangeText={this.handleChangeTextProjectCreator}
                    style={styles.textbox}
                />

                <Text style={styles.label}>Project description</Text>
                <TextInput
                    value={this.state.projectDetail}
                    onChangeText={this.handleChangeTextProjectDetail}
                    multiline={true}
                    style={styles.textboxMulti}
                />

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                      onPress={() => this.setState({ dialogImageUpload: true })}
                      style={styles.btnWide2}
                  >
                    <Text style={styles.btnLabel}>Upload image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => this.createProject(this.state)}
                      style={styles.btnWide}
                  >
                    <Text style={styles.btnLabel}>Create project</Text>
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
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  datePickerContainer: {
    width: '80%',
    marginVertical: 15,
    alignSelf: 'center'
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  btnContainer: {
    width: '100%',
    height: 108,
    backgroundColor: 'gray'
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
  btnWide: {
    width: '100%',
    height: 54,
    backgroundColor: "rgba(0,150,136,1)",
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnWide2: {
    width: '100%',
    height: 54,
    backgroundColor: "rgba(76,76,77,1)",
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  btnLabel: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 19
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
    width: '80%',
    alignSelf:'center',
    marginBottom: 25,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: "center",
    color: 'gray'
  },
  textboxMulti: {
    width: '80%',
    alignSelf:'center',
    marginVertical: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: "center",
    color: 'gray'
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

