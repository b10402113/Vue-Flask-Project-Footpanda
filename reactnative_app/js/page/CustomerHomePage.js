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
import APIKit from '../shared/APIKit';
import CustomerOrderPage from './CustomerOrderPage';
import StorePage from './StorePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const initialState = {
//   username: '',
//   password: '',
//   errors: {},
//   isAuthorized: false,
//   isLoading: false,
//   type: 1,
// };
export default class CustomerHomePage extends Component {
  _tabNavigator() {
    return createAppContainer(
      createBottomTabNavigator({
        StorePage: {
          screen: StorePage,
          navigationOptions: {
            tabBarLabel: 'Store',
            tabBarIcon: ({tintColor, focus}) => (
              <MaterialIcons
                name={'home'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        CustomerOrderPage: {
          screen: CustomerOrderPage,
          navigationOptions: {
            tabBarLabel: 'Order',
            tabBarIcon: ({tintColor, focus}) => (
              <MaterialIcons
                name={'whatshot'}
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
