import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import NavigationUtil from '../navigator/NavigationUtil';

export default class WelcomePage extends Component {
  // componentDidMount() {
  //   this.timer = setTimeout(()=>{
  //     // 跳轉到首頁
  //
  //   },200)
  // }
  doLogin() {
    console.log(123);
  }
  render() {
    const {navigation} = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To Foodpanda</Text>
        <View>
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('LoginPage')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Register"
              onPress={() => navigation.navigate('RegisterPage')}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  button: {
    marginBottom: 20,
  },

  text: {
    marginTop: 70,
    fontSize: 30,
    textAlign: 'center',
  },
});
