import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import APIKit from '../../shared/APIKit';
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
import NavigationUtil from '../../navigator/NavigationUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class StoreProductManagePage extends Component {
  async componentDidMount() {
    const res = await APIKit.get('/store/product');
    console.log(res);

    this.setState({
      productList: res.data.list,
      fullData: res.data.list,
    });
  }
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      productList: [],
      query: '',
      address: '',
    };
  }
  addProduct() {
    NavigationUtil.goPage('', 'StoreAddProductPage');
  }
  editProduct(item) {
    NavigationUtil.goPage(
      {
        product_id: item.id,
        product_name: item.name,
        product_category: item.category,
        product_price: item.price,
      },
      'StoreEditProductPage',
    );
  }
  deleteProduct(id) {

    APIKit.delete('/store/product', {
      data: {
        id: id,
      },
    }).then(res => {
      ToastAndroid.showWithGravity(
        'Delete success',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      NavigationUtil.goPage('', 'StoreHomePage');
    });
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
        <Body>
          <Text>Category: </Text>
          <Text>{item.category}</Text>
        </Body>
        {/*<Text>Category: {item.category}</Text>*/}

        <Button
          style={styles.button}
          iconLeft
          light
          onPress={() => this.deleteProduct(item.id)}>
          <Icon name="trash" />
        </Button>

        <Button
          style={styles.button}
          iconLeft
          light
          onPress={() => this.editProduct(item)}>
          <MaterialIcons name={'edit'} size={26} />
        </Button>
      </ListItem>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <List>
          <FlatList
            data={this.state.productList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </List>
        <Button success full onPress={() => this.addProduct()}>
          <Text>Create Product</Text>
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
    width: 50,
  },
});
