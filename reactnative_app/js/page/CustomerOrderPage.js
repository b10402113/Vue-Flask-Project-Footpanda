import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import APIKit from '../shared/APIKit';
import NavigationUtil from '../navigator/NavigationUtil';

const ic_delete = require('../assets/images/delete.png');
const ic_back = require('../assets/images/return.png');

export default class CustomerOrderPage extends Component {
  async componentDidMount() {
    const res = await APIKit.get('/customer/orders');
    this.setState({data: res.data});
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      close: false,
      search: '',
    };
  }
  item = null;
  _updateSearch = search => {
    this.setState({search});
  };
  deleteOrder() {}
  _renderButtonDelete = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(this.item.status);
          if (this.item.status === 'WAIT_ACCEPT') {
            APIKit.delete('/customer/orders', {
              data: {order_id: this.item.id},
            }).then(res => {
              NavigationUtil.goPage('', 'CustomerHomePage');
            });
          } else {
            ToastAndroid.showWithGravity(
              'Delete Failed!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }}>
        <Image
          source={ic_delete}
          resizeMode="contain"
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    );
  };

  _renderButtonClose = () => {
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'green'}]}
        onPress={() => {
          console.log(this.item.status);
          if (this.item.status === 'WAIT_DELIVER') {
            APIKit.put('/customer/orders', {
              order_id: this.item.id,
            }).then(res => {
              console.log(res);
              NavigationUtil.goPage('', 'CustomerHomePage');
            });
          } else {
            ToastAndroid.showWithGravity(
              'Delete Failed!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }}>
        <Image
          source={ic_back}
          resizeMode="contain"
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    );
  };

  swipeoutBtns = [
    {
      // text: 'Delete',
      backgroundColor: 'white',
      component: this._renderButtonDelete(),
      // onPress: () => {
      //   Alert.alert('Delete')
      // }
    },
    {
      //   // text: 'Close',
      component: this._renderButtonClose(),
      backgroundColor: 'white',
      //   // onPress: () => {
      //   //   Alert.alert('Close')
      //   // }
    },
  ];

  renderItem = ({item, index}) => {
    return (
      <Swipeout
        close={this.state.close}
        onOpen={() => {
          this.item = item;
        }}
        style={{padding: 4, backgroundColor: 'white'}}
        autoClose
        right={this.swipeoutBtns}>
        <View style={styles.item}>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 10,
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold'}}>{item.id}</Text>
            <Text style={{fontWeight: 'bold'}}>{item.status}</Text>
            <Text numberOfLines={2}>{item.create_time}</Text>
          </View>
        </View>
      </Swipeout>
    );
  };

  render() {
    const {data} = this.state;
    const {search} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => `key-${item.id}`}
          renderItem={this.renderItem}
          extraData={data}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: 'white',
    elevation: 3,
  },
  img: {
    width: 80,
    height: 80,
  },
  button: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
  },
});
