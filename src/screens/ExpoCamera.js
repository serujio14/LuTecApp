import React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

const { width: winWidth, height: winHeight } = Dimensions.get('screen');

export default class ExpoCamera extends React.Component {
  constructor() {
    super();
    this.state = {
      type: Camera.Constants.Type.back,
      hasPermission: false,
      capturing: false
    }
  }

  componentDidMount() {
    this.askPermission();
  }

  askPermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      this.setState({ hasPermission: true });
    }
  }

  toggleCameraMode = () => {
    let { type } = this.state;
    type = type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back;
    this.setState({ type });
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({ capturing: true });
      const options = {
        quality: 1,
        base64: true
      };
      const data = await this.camera.takePictureAsync(options);
      //console.log('takePicture', data);
      this.setState({ capturing: false });
      this.props.navigation.state.params.setImage(data);
      this.props.navigation.goBack();
    }
  };


  render() {
    const { type, hasPermission, capturing } = this.state;
    return (
      <View style={{flex:1}}>
        {
          hasPermission && (
            <View>
              <Camera
                type={type}
                style={styles.preview}
                ref={camera => this.camera = camera}
              />
            </View>
          )
        }
        <Grid style={styles.bottomToolbar}>
          <Row>
            <Col />
            <Col size={1} style={styles.alignCenter}>
              <TouchableWithoutFeedback onPress={this.takePicture}>
                <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                  {capturing && <View style={styles.captureBtnInternal} />}
                </View>
              </TouchableWithoutFeedback>
            </Col>
            <Col style={styles.alignCenter}>
              <TouchableOpacity onPress={this.toggleCameraMode}>
                <Ionicons name="md-reverse-camera" color="white" size={30} />
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent",
  },
});