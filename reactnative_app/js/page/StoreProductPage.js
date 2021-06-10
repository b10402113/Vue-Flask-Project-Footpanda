import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import APIKit from '../shared/APIKit';
import {ListItem} from 'react-native-elements';
import {
  Body,
  Container,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  Right,
  Content,
  Thumbnail,
  Button,
} from 'native-base';
import NavigationUtil from '../navigator/NavigationUtil';
export default class StoreProductPage extends Component {
  async componentDidMount() {
    const res = await APIKit.get(`/store/product/${this.store_id}`);
    res.data.list.forEach(item => {
      item.count = 0;
    });

    this.setState({
      productList: res.data.list,
      fullData: res.data.list,
    });
    console.log(this.state.productList);
  }
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const {store_id} = this.params;
    this.store_id = store_id;
    this.state = {
      productList: [],
      query: '',
      address: '',
    };
  }
  async handleSearch(text) {
    if (text.trim() == '') {
      return;
    }

    const res = await APIKit.get(`/store/product/${this.store_id}/${text}`);
    res.data.list.forEach(item => {
      item.count = 0;
    });
    if (res.data.list.length != 0) {
      this.setState({productList: res.data.list, query: text});
    } else {
      this.setState({productList: this.state.fullData, query: text});
    }
  }
  addButton(index) {
    const newProductList = [...this.state.productList];
    console.log(newProductList);
    newProductList[index].count++;
    this.setState({
      productList: newProductList,
    });
  }
  subButton(index) {
    const newProductList = [...this.state.productList];
    console.log(newProductList);
    if (newProductList[index].count >= 1) {
      newProductList[index].count--;
    }

    this.setState({
      productList: newProductList,
    });
  }
  async createOrder() {
    this.orderSubmit = [];
    this.state.productList.forEach(item => {
      if (item.count > 0) {
        this.orderSubmit.push({
          id: item.id,
          count: item.count,
        });
      }
    });
    // console.log(this.orderSubmit);
    if (this.orderSubmit.length == 0 || !this.state.address) {
      return;
    }
    await APIKit.post('/customer/orders', {
      sid: this.store_id,
      products: this.orderSubmit,
      customer_address: this.state.address,
    }).then(res => {
      console.log(res);
      if (res.error_code == 200) {
        ToastAndroid.showWithGravity(
          'Create Order Success!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    });
    NavigationUtil.goPage('', 'CustomerHomePage');
  }
  _renderItem = ({item, index}) => {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail
            source={{
              uri: `http://192.168.1.102:5000/v1/store/product_img/${item.id}`,
            }}
          />
        </Left>
        <Body>
          <Text>name: {item.name}</Text>
          <Text>price: {item.price}</Text>
        </Body>
        <Text>Category: {item.category}</Text>

        <Button
          style={styles.button}
          block
          onPress={() => this.subButton(index)}>
          <Text>-</Text>
        </Button>
        <Text>{item.count}</Text>
        <Button
          style={styles.button}
          block
          onPress={() => this.addButton(index)}>
          <Text>+</Text>
        </Button>
      </ListItem>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search Category"
              onChangeText={this.handleSearch.bind(this)}
            />
          </Item>
        </Header>
        <List>
          <FlatList
            data={this.state.productList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </List>
        <Content>
          <Item>
            <Icon active name="home" />
            <Input
              placeholder="Input Address"
              onChangeText={value => this.setState({address: value})}
            />
          </Item>
        </Content>
        <Button success full onPress={() => this.createOrder()}>
          <Text>Create Order</Text>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 30,
  },
});
