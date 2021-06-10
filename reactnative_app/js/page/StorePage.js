import React, {Component} from 'react';
import NavigationUtil from '../navigator/NavigationUtil';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Text,
  List,
  Left,
  Thumbnail,
  Body,
  Right,
} from 'native-base';
import {ListItem} from 'react-native-elements';
import APIKit from '../shared/APIKit';

export default class StorePage extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.navigation);
    this.state = {
      data: [],
      fullData: [],
      query: '',
    };
  }

  async componentDidMount() {
    const res = await APIKit.get('/store/all');

    this.setState({
      data: res.data.list,
      fullData: res.data.list,
    });
  }

  onPressLogin() {
    console.log(1);
    NavigationUtil.goPage(
      {
        navigation: this.props.navigation,
      },
      'LoginPage',
    );
    // this.props.navigation.push('LoginPage');
  }

  async handleSearch(text) {
    if (text.trim() == '') {
      this.setState({
        data: this.state.fullData,
      });
      return;
    }

    const res = await APIKit.get(`/store/${text}`);
    this.setState({data: res.data.list, query: text});
  }

  _goToItemPage(item) {
    console.log(item);
    NavigationUtil.goPage(
      {
        store_id: item.id,
      },
      'StoreProductPage',
    );
  }
  _renderItem = ({item, index}) => {
    return (
      <ListItem
        avatar
        Component={TouchableOpacity}
        onPress={this._goToItemPage.bind(this, item)}>
        <Left>
          <Thumbnail
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU88USTP_J6yLCnbkZ2Uu6Iot4VkuiN6A4A&usqp=CAU',
            }}
          />
        </Left>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        <Right>
          <Text note>{item.id}</Text>
        </Right>
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
              placeholder="Search Store"
              onChangeText={this.handleSearch.bind(this)}
            />
          </Item>
        </Header>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </List>
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
});
