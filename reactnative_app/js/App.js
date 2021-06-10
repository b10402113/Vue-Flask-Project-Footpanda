import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';

type Props = {};
export default class App extends Component<Props> {
  render() {
    /**
     * 将store传递给App框架
     */
    return (
        <AppNavigator />
    );
  }
}
