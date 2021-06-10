import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//@ https://github.com/react-navigation/react-navigation/releases/tag/v4.0.0
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import CustomerHomePage from '../page/CustomerHomePage';
import StoreProductPage from "../page/StoreProductPage";
import StoreHomePage from "../page/Store/StoreHomePage";
import StoreEditProductPage from "../page/Store/StoreEditProductPage";
import StoreAddProductPage from "../page/Store/StoreAddProductPage";
import DeliveryHomePage from "../page/Delivery/DeliveryHomePage";
// import WebViewPage from '../page/WebViewPage';
// import DetailPage from '../page/DetailPage';
// import SortKeyPage from '../page/SortKeyPage';
// import SearchPage from '../page/SearchPage';
// import CustomKeyPage from '../page/CustomKeyPage';
// import AboutPage from '../page/about/AboutPage';
// import AboutMePage from '../page/about/AboutMePage';
// import CodePushPage from '../page/CodePushPage';

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const MainNavigator = createStackNavigator(
  {
    WelcomePage: {
      screen: WelcomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        title: 'Login',
      },
    },
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: {
        headerShown: false, // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      },
    },
    CustomerHomePage: {
      screen: CustomerHomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    StoreProductPage: {
      screen: StoreProductPage,
    },
    StoreHomePage: {
      screen: StoreHomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    StoreAddProductPage: {
      screen: StoreAddProductPage,
    },
    StoreEditProductPage: {
      screen: StoreEditProductPage,
    },
    DeliveryHomePage: {
      screen: DeliveryHomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    // AboutPage: {
    //   screen: AboutPage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
    // AboutMePage: {
    //   screen: AboutMePage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
    // CustomKeyPage: {
    //   screen: CustomKeyPage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
    // SortKeyPage: {
    //   screen: SortKeyPage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
    // SearchPage: {
    //   screen: SearchPage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
    // CodePushPage: {
    //   screen: CodePushPage,
    //   navigationOptions: {
    //     headerShown: false,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    //   },
    // },
  },
  {
    initialRouteName: 'WelcomePage',
  },
);
export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        headerShown: false,
      },
    },
  ),
);
