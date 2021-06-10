import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {Container, Header, Content, Form, Item, Picker} from 'native-base';
import axios from 'axios';
import APIKit from '../shared/APIKit';
const initialState = {
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
  type: 1,
};
export default class LoginPage extends Component {
  state = initialState;
  constructor(props) {
    super(props);
  }
  async onPressLogin() {
    const {username, password, type} = this.state;
    // const payload = {
    //   account: 'dsajlflsadf@gmail.com',
    //   secret: '1235',
    //   type:3,
    // };
    const payload = {
      account: username,
      secret: password,
      type:  parseInt(type),
    };

    const res = await APIKit.post('/token', payload);
    if (res.error_code !== 200) {
      ToastAndroid.showWithGravity(
        'Login Failed!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      // 登入成功
      await AsyncStorage.setItem('user_token', res.data.token);
      ToastAndroid.showWithGravity(
        'Login Success!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      if (payload.type == 1) {
        // 跳到顧客頁面
        // navigator
        this.props.navigation.navigate('CustomerHomePage');
      } else if (payload.type == 2) {
        this.props.navigation.navigate('StoreHomePage');
      } else {
        this.props.navigation.navigate('DeliveryHomePage');
      }
    }
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Input
          placeholder="INPUT Email"
          onChangeText={value => this.setState({username: value})}
          leftIcon={<Icon name="user" size={24} color="black" />}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={24} color="black" />}
          onChangeText={value => this.setState({password: value})}
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
        />
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              placeholder="Select your SIM"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.type}
              onValueChange={value => this.setState({type: value})}>
              <Picker.Item label="Customer" value="1" />
              <Picker.Item label="Store" value="2" />
              <Picker.Item label="Delivery" value="3" />
            </Picker>
          </Item>
        </Form>
        <View style={styles.button}>
          <Button title="Login" onPress={this.onPressLogin.bind(this)} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
