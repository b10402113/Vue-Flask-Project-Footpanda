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

export default class StoreEditProductPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const {product_id, product_price, product_name, product_category} =
      this.params;
    // this.store_id = store_id;
    this.state = {
      name: product_name,
      price: product_price,
      category: product_category,
      id: product_id,
    };
    console.log(this.state);
  }
  componentDidMount() {}
  handleModifyProduct = () => {
    const data = new FormData();
    console.log(this.state.name);
    console.log(this.state.price);
    console.log(this.state.category);
    console.log(this.state.id);
    // console.log(this.state.photo);
    data.append('name', this.state.name);
    data.append('id', this.state.id);
    data.append('price', this.state.price);
    data.append('category', this.state.category);

    let config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    APIKit.put('/store/product', data, config).then(res => {
      console.log(res);
      if (res.error_code === 200) {
        ToastAndroid.showWithGravity(
          '修改成功',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        NavigationUtil.goPage('', 'StoreHomePage');
      } else {
        ToastAndroid.showWithGravity(
          '修改失敗',
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
          value={this.state.name}
        />
        <Input
          placeholder="Input pirce"
          leftIcon={<Icon name="money" size={24} color="black" />}
          onChangeText={value => this.setState({price: value})}
          value={this.state.price.toString()}
        />
        <Input
          placeholder="Input category"
          leftIcon={<Icon name="music" size={24} color="black" />}
          onChangeText={value => this.setState({category: value})}
          value={this.state.category}
        />

        <Button title="Modify PRODUCT" onPress={this.handleModifyProduct} />
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
