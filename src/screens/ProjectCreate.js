import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicator, Alert, TextInput, ScrollView, Dimensions, SafeAreaView, StatusBar, Platform} from "react-native";
import Dialog from "react-native-dialog";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import ImageUpload from "../components/ImageUpload";

const { height } = Dimensions.get('window');

export default class ProjectCreate extends Component {

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
    years = Moment(years).subtract(5, 'year').format('d MMM YYYY'); // for specific format

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
      screenHeight: height,
      minDate5years : years,
      image: '',
      imageBase64: '',
      images: [],
      selectedImageIndex: null,
      loadingText: 'Loading..'
    }

    this.handleChangeTextProjectName = this.handleChangeTextProjectName.bind(this)
    this.handleChangeTextProjectDate = this.handleChangeTextProjectDate.bind(this)
    this.handleChangeTextProjectDetail = this.handleChangeTextProjectDetail.bind(this)
    this.handleChangeTextProjectCreator = this.handleChangeTextProjectCreator.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
    this.createProject = this.createProject.bind(this)
    this.CheckTextInput = this.CheckTextInput.bind(this)
  }

  async componentDidMount() {
    await this.askForPermission();
  }

  askForPermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleContinue = () => {
    this.setState({ dialogVisible: false });
    let { navigate } = this.props.navigation;
    navigate("ProjectsModule")
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

  getFileType = (uri) => {
    const uriPathArr = uri.split('/');
    filename = uriPathArr[uriPathArr.length - 1];
    extension = filename.split('.');
    extension = extension[1];
    type = `image/${extension}`;
    return { filename, extension, type };
  }

  pickImage = async () => {
    this.setState({
      dialogImageUpload: false,
      isLoading: true,
      loadingText: 'Preparing Image..'
    });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const { uri, base64 } = result;
      // this.setState({ image: uri, imageBase64: base64 });
      this.setImage(uri, base64);
    }

    this.setState({ isLoading: false });
  };

  openCamera = async () => {
    this.setState({ dialogImageUpload: false });
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: true
    });

    if (!result.cancelled) {
      const { uri, base64 } = result;
      // this.setState({ image: uri, imageBase64: base64 });
      this.setImage(uri, base64);
    }

    this.setState({ isLoading: false });
  }

  openCameraExpo = async () => {
    this.setState({ dialogImageUpload: false });
    this.props.navigation.navigate('ExpoCamera', {
      setImage: async ({ uri, base64 }) => {
        const check = await FileSystem.getInfoAsync(uri)
        console.log('is camera pic exist: ', check)
        this.setImage(uri, base64)
      }
    });
    Alert.alert("Image added", "Project image added succesfully");
  }

  setImage = (uri, base64) => {
    const { selectedImageIndex, images } = this.state;
    const { filename, type } = this.getFileType(uri);
    const formData = {
      name: filename,
      uri,
      type,
    };

    images[selectedImageIndex] = {
      uri,
      base64: `data:${type};base64,${base64}`,
      formData,
    };

    this.setState({ images });
  }

  openImageDialog = (index) => {
    this.setState({
      selectedImageIndex: index,
      dialogImageUpload: true
    });
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

      fetch("http://simplesolutionscr.com/lutecapp/service.php?who=create_project&api_key=5183723902398237640&projectName="
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
      Alert.alert("Error", "Please fill all the project information");
    }
  }

  createProjectByFormData = async () => {

    if (this.CheckTextInput()) {

      if (this.state.images.length < 4) {
        const remaining = 4 - this.state.images.length;
        Alert.alert('Oops!', `You need add ${remaining} images`);
        return;
      }

      this.setState({ isLoading: true, loadingText: 'Creating Project...' });
      const {
        projectName,
        projectDetail,
        txtProjectDate,
        projectCreator,
        images
      } = this.state;

      if (images.length) {

        const formData = new FormData;
        images.forEach((image, index) => {
          const key = index === 0 ? 'projectImage' : 'projectImage' + index
          formData.append(key, image.formData);
        });

        const params = {
          who: 'create_project',
          api_key: '5183723902398237640',
          projectDate: txtProjectDate,
          projectName: projectName,
          projectDetail: projectDetail,
          projectCreator : projectCreator
        };

        const urlParam = this.encodeQueryData(params);
        const url = `http://simplesolutionscr.com/lutecapp/service.php?${urlParam}`;
        console.log('URL', url);

        fetch(url, {
          method: 'POST',
          body: formData
        }).then(response => response.json())
        .then(data => {
          //console.log('createProjectByFormData:', data);
          let dt;
          Moment.locale('en');
          dt = new Date();
          dt = Moment(dt).format('dd MMM YYYY');
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
            loadingText: 'Loading..',
            images: [],
            selectedImageIndex: null
          });
        })
        .catch((error) => {
          console.error('error at createProjectByFormData:', error);
          this.setState({
            isLoading : false,
            dialogFailVisible: true,
          });
        });
      }
    }else{
      Alert.alert("Error", "Please Fill All Spaces and Passwords must match");
    }

  }

  render() {
    const { images, loadingText } = this.state
    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {

      return <View style={styles.containerLoader}>
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" color="#009688" />
          <Text>{loadingText}</Text>
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
                  <Dialog.Button label="Continue" onPress={this.handleContinue} />
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
                  <Dialog.Button label="From Gallery" onPress={this.pickImage} />
                </Dialog.Container>

                <View style={styles.imagesUpload}>
                  <ImageUpload
                      images={images}
                      setImage={() => this.openImageDialog(0)}
                      indexImage={0}
                  />

                  <ImageUpload
                      images={images}
                      setImage={() => this.openImageDialog(1)}
                      indexImage={1}
                  />

                  <ImageUpload
                      images={images}
                      setImage={() => this.openImageDialog(2)}
                      indexImage={2}
                  />

                  <ImageUpload
                      images={images}
                      setImage={() => this.openImageDialog(3)}
                      indexImage={3}
                  />
                </View>

                <DatePicker
                    style={styles.datePickerContainer}
                    date={this.state.date}
                    mode="date"
                    value= {this.state.txtProjectDate}
                    format="DD MMM YYYY"
                    maxDate={new Date()}
                    placeholder={this.state.txtProjectDate}
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

                <TextInput
                    placeholder= "Project name"
                    value={this.state.projectName}
                    maxLength={15}
                    onChangeText={this.handleChangeTextProjectName}
                    style={styles.textbox}
                />

                <TextInput
                    placeholder= "Project creator(s)"
                    value={this.state.projectCreator}
                    onChangeText={this.handleChangeTextProjectCreator}
                    style={styles.textbox}
                />

                <TextInput
                    placeholder= "Project description"
                    value={this.state.projectDetail}
                    onChangeText={this.handleChangeTextProjectDetail}
                    multiline={true}
                    style={styles.textboxMulti}
                />

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                      onPress={() => this.createProjectByFormData()}
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
  imagesUpload: {
    flex: 1,
    flexDirection: 'row'
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  datePickerContainer: {
    width: '70%',
    marginBottom: 15,
    alignSelf: 'center'
  },
  containerLoader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  btnContainer: {
    flex:1,
    justifyContent: 'flex-end',
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
    lineHeight: 56,
    marginBottom: 5
  },
  label: {
    fontFamily: "roboto-regular",
    color: "#595A5C",
    flexDirection: "row",
    marginTop: 15,
    textAlign: 'center'
  },
  textbox: {
    width: '70%',
    alignSelf:'center',
    marginVertical: 25,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: "center",
    color: 'gray'
  },
  textboxMulti: {
    width: '80%',
    alignSelf:'center',
    marginTop: 25,
    marginBottom: 34,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    textAlign: "center",
    color: 'gray'
  },
  createProject: {
    fontFamily: "roboto-regular",
    color: "rgba(251,251,251,1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 88
  },
  projectName: {
    top: 0,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  projectDate: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 33,
    marginLeft: 30
  },
});

