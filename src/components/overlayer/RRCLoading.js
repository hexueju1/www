

import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import RRCTopView from './RRCTopView';
const { width, height } = Dimensions.get('window')

const LoadingOptions = {}

export default class OverlayLoading {
  static setLoadingOptions(options = {}) {
    if (typeof options.text == 'string') {
      LoadingOptions.text = options.text;
    }
    if (typeof options.loadingBackgroundColor == 'string') {
      LoadingOptions.loadingBackgroundColor = options.loadingBackgroundColor;
    }
    if (options.loadingImage != undefined) {
      LoadingOptions.loadingImage = options.loadingImage;
    }
    if (typeof options.loadingViewStyle == 'object' && !Array.isArray(options.loadingViewStyle)) {
      LoadingOptions.loadingViewStyle = options.loadingViewStyle;
    }
    if (typeof options.loadingTextStyle == 'object' && !Array.isArray(options.loadingTextStyle)) {
      LoadingOptions.loadingTextStyle = options.loadingTextStyle;
    }
    if (options.onPress != undefined) {
      LoadingOptions.onPress = options.onPress;
    }
  }
  static show(textContent = (LoadingOptions.text && LoadingOptions.text.length > 0 ? LoadingOptions.text : '加载中...')) {
    const loadingBackgroundColor = LoadingOptions.loadingBackgroundColor ? LoadingOptions.loadingBackgroundColor : 'rgba(0,0,0,0.0)';
    const loadingViewBackgroundColor = LoadingOptions.loadingViewStyle && LoadingOptions.loadingViewStyle.backgroundColor ? LoadingOptions.loadingViewStyle.backgroundColor : 'rgba(0,0,0,0.8)'
    const loadingView = (
      < TouchableWithoutFeedback
        onPress={() => {
          // this.hide()
          LoadingOptions.onPress()
        }}
        style={{
          position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: loadingBackgroundColor, justifyContent: 'center', alignItems: 'center'
        }}>
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: loadingViewBackgroundColor,
          padding: 400,
          borderRadius: 5,
          margin: width * 0.1
        }, { ...LoadingOptions.loadingViewStyle }]}>
          {
            LoadingOptions.loadingImage ?
              <Image source={LoadingOptions.loadingImage} style={{ width: 50, height: 50, marginTop: 10 }} />
              :
              <ActivityIndicator
                color={'#fff'}
                animating={true}
                style={{ marginTop: 10 }}
                size="large"
              />
          }
          <Text style={[{
            color: '#fff',
            margin: 10,
            fontSize: 16,
            lineHeight: 20,
            marginBottom: 5
          }, { ...LoadingOptions.loadingTextStyle }]}>{textContent}</Text>
        </View>
      </ TouchableWithoutFeedback>
    )
    RRCTopView.addLoading(loadingView);
  }

  static hide() {
    RRCTopView.removeLoading();
  }

  static transformRoot(transform, animated, animatesOnly = null) {
    RRCTopView.transform(transform, animated, animatesOnly);
  }

  static restoreRoot(animated, animatesOnly = null) {
    RRCTopView.restore(animated, animatesOnly);
  }
}