import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import APIKit from '../../shared/APIKit';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeliveryOrderPage from './DeliveryOrderPage';
import DeliveryPickUpPage from './DeliveryPickUpPage';
import  {DeviceEventEmitter} from 'react-native';
export default class DeliveryHomePage extends Component {
  componentDidMount() {
    // 注册事件通知
    DeviceEventEmitter.emit('testName');
    //testName:通知的名称 param：发送的消息（传参）
  }
  _tabNavigator() {
    return createAppContainer(
      createBottomTabNavigator({
        DeliveryOrderPage: {
          screen: DeliveryOrderPage,
          navigationOptions: {
            tabBarLabel: 'Order Manage',
            tabBarIcon: ({tintColor, focus}) => (
              <MaterialIcons
                name={'list'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        DeliveryPickUpPage: {
          screen: DeliveryPickUpPage,
          navigationOptions: {
            tabBarLabel: 'PickUp',
            tabBarIcon: ({tintColor, focus}) => (
              <MaterialIcons
                name={'save'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
      }),
    );
  }
  constructor(props) {
    super(props);
    // this.props.
  }
  // componentDidMount() {
  //
  // }
  async onPressLogin() {
    const {username, password, type} = this.state;
    const payload = {
      account: 'dsajlflsadf@gmail.com',
      secret: '1235',
      type: 1,
    };
    // const payload = {
    //   account: username,
    //   secret: password,
    //   type: type,
    // };

    const res = await APIKit.post('/token', payload);
    if (res.error_code !== 200) {
      ToastAndroid.showWithGravity(
        'Login Failed!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
    }
  }
  render() {
    const Tab = this._tabNavigator();
    const {navigation} = this.props;
    return <Tab />;
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
