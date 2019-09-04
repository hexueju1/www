import React, { Component } from 'react';
import {
  findNodeHandle, UIManager, requireNativeComponent, Platform, Dimensions, ToastAndroid, BackHandler, SafeAreaView, Button, TextInput, FlatList, Image, StyleSheet, Text, View
} from 'react-native';

class MyNativeWebViewComponent extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <MyNativeWebView {...this.props}/>
    );
  }

  injectJavaScript(symbol) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig('MyNativeWebView').Commands.injectJavaScript,
      [symbol],
    );
  }

  reload(symbol) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig('MyNativeWebView').Commands.reload,
      [symbol],
    );
  }
}

MyNativeWebViewComponent.propTypes = {
  ...View.propTypes
};

var MyNativeWebView = requireNativeComponent('MyNativeWebView', MyNativeWebViewComponent);

module.exports = MyNativeWebViewComponent;