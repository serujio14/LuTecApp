import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const thumbnail = width / 4 - 10;

const ImageUpload = ({ setImage, images, indexImage }) => (
  <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={setImage} activeOpacity={0.8}>
    <View style={[styles.imagePlaceholder, images.length > 0 && images[indexImage] ? {} : {backgroundColor: 'grey'}]}>
      {
        images.length > 0 && images[indexImage]
          ? <Image source={{uri: images[indexImage].uri}} style={{ width: thumbnail, height: thumbnail }} />
          : <Text style={[styles.textCenter, styles.textWhite]}>Tap to add image</Text>
      }
    </View>
    <Text style={[styles.imageButton]}>Image {indexImage + 1}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row'
  },
  textCenter: {
    textAlign: 'center'
  },
  textWhite: {
    color: 'white'
  },
  imageButton: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 10,
    backgroundColor: 'grey',
  },
  imagePlaceholder: {
    width: thumbnail,
    height: thumbnail,
    justifyContent: 'center',
  }
});

export default ImageUpload;