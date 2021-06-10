import React, {Component} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import APIKit from '../../shared/APIKit';
import NavigationUtil from '../../navigator/NavigationUtil';

export default class StoreAddProductPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const {store_id} = this.params;
    this.store_id = store_id;
    this.state = {
      photo: null,
      name: '',
      price: null,
      category: null,
    };
  }
  // componentDidMount() {
  //   this.timer = setTimeout(()=>{
  //     // 跳轉到首頁
  //
  //   },200)
  // }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      console.log(response);
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };
  handleAddProduct = () => {
    const data = new FormData();
    console.log(this.state.name);
    console.log(this.state.price);
    console.log(this.state.category);
    console.log(this.state.photo);
    data.append('name', this.state.name);
    data.append('price', this.state.price);
    data.append('category', this.state.category);
    data.append('img', {
      name: 'image',
      type: 'image/jpeg',
      uri: this.state.photo.uri,
    });
    let config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    APIKit.post('/store/product', data, config).then(res => {
      console.log(res);
      if (res.error_code === 200) {
        ToastAndroid.showWithGravity(
          '添加成功',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        NavigationUtil.goPage('', 'StoreHomePage');
      } else {
        ToastAndroid.showWithGravity(
          '添加失敗',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    });
  };
  render() {
    const {photo} = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="INPUT product name"
          onChangeText={value => this.setState({name: value})}
          leftIcon={<Icon name="name" size={24} color="black" />}
        />
        <Input
          placeholder="Input pirce"
          leftIcon={<Icon name="money" size={24} color="black" />}
          onChangeText={value => this.setState({price: value})}
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
        />
        <Input
          placeholder="Input category"
          secureTextEntry={true}
          leftIcon={<Icon name="music" size={24} color="black" />}
          onChangeText={value => this.setState({category: value})}
        />
        <View style={styles.buttons}>
          {photo && (
            <Image
              source={{uri: photo.uri}}
              style={{width: 100, height: 100}}
            />
          )}
          <Button title="Choose photo" onPress={this.handleChoosePhoto} />
        </View>
        <Button title="ADD PRODUCT" onPress={this.handleAddProduct} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginBottom: 30,
  },
});
