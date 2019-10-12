'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  requireNativeComponent,
  Platform,
  Dimensions,
  ToastAndroid,
  BackHandler,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import { StackViewTransitionConfigs } from 'react-navigation'
import { hidden } from 'ansi-colors'
import LinearGradient from 'react-native-linear-gradient'
import Operator from '../../pages/operator/OperatorScreen'
import { launchCamera, uploadFileToOss } from '../../utils/MyPhotoSelectUtils'
import * as Progress from 'react-native-progress'

export default class PersonalPictureScreen extends BaseScreen {
  idcardPath = ''

  constructor(props) {
    super(props)
    this.idcardPath = this.props.navigation.getParam('idcardPath')
    this.state = {
      centerImage: images.camera,
      uploadProgress: 0,
      realPersonPath: '',
    }
  }

  takePhoto = () => {
    launchCamera().then((source) => {
      this.setState({
        centerImage: source,
      })
      this.autoUpload()
    })
  }

  autoUpload = () => {
    MyHttpUtils.fetchRequest('post', endpoint.oss.get_signature).then((responseJson) => {
      uploadFileToOss(
        responseJson,
        this.state.centerImage.uri,
        (progress) => {
          this.setState({
            uploadProgress: progress,
          })
        },
        (urlPath) => {
          console.log('urlPath = ' + urlPath)
          this.setState({
            realPersonPath: urlPath,
          })
        },
        '_autodyne.jpg',
      )
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="身份认证" />
        {/* 身份认证文字内容 */}
        <View style={{ marginTop: px(45) }}>
          <Text style={styles.textcontent}>请正对手机，确保光线充足</Text>
        </View>
        {/* 本人照片 */}
        <TouchableOpacity
          style={styles.idcardborder}
          onPress={() => {
            this.takePhoto()
          }}
        >
          <View style={styles.topBorder}></View>
          <View style={styles.bottomBorder}></View>
          <View style={styles.leftBorder}></View>
          <View style={styles.rightBorder}></View>
          <View style={styles.line}></View>
          <LinearGradient style={styles.linear} colors={['#A6DAF2', '#E9ECEF']}></LinearGradient>
          <Image style={styles.cameraStyle} source={this.state.centerImage} />
        </TouchableOpacity>
        <Button
          full
          style={styles.buttonstyle}
          onPress={() => {
            if (this.state.centerImage == images.camera) {
              showToast('请先上传照片')
              return
            }
            if (this.state.uploadProgress != 1) {
              showToast('请等待图片上传完成')
              return
            }
            MyHttpUtils.fetchRequest('post', endpoint.liveness.check_identity, {
              front_url: this.idcardPath,
              autodyne_url: this.state.realPersonPath,
            }).then((responseJson) => {
              //  "state": 1, // 0 需进行人证核验 1 需进行运营商认证 2 无需认证
              switch (responseJson.data.state) {
                case 1:
                  this.props.navigation.navigate('Operator')
                  break
                case 2:
                  this.props.navigation.navigate('CertificationStatus')
                  break
                case 3:
                  this.props.navigation.navigate('BankCard')
                  break
                default:
                  this.props.navigation.navigate('CertificationStatus')
                  break
              }
            })
          }}
        >
          <Text style={{ color: color.white, fontSize: 16 }}>确定</Text>
        </Button>

        <View style={{ alignItems: 'center' }}>
          <Progress.Circle progress={this.state.uploadProgress} size={100} showsText={true} />
        </View>
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E9ECEF',
  },
  textcontent: {
    alignSelf: 'center',
    color: '#0F0F0F',
    fontSize: sp(16),
  },
  idcardborder: {
    width: px(260),
    height: px(260),
    borderWidth: px(2),
    borderColor: '#22AAEF',
    paddingTop: px(7),
    position: 'absolute',
    top: px(190),
    left: '50%',
    marginLeft: px(-130),
  },
  topBorder: {
    position: 'absolute',
    top: px(-2),
    left: px(54),
    width: px(151),
    height: px(6),
    backgroundColor: '#E9ECEF',
  },
  bottomBorder: {
    position: 'absolute',
    top: px(256),
    left: px(54),
    width: px(151),
    height: px(6),
    backgroundColor: '#E9ECEF',
  },
  leftBorder: {
    position: 'absolute',
    left: px(-2),
    top: px(54),
    width: px(6),
    height: px(151),
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: px(256.5),
    top: px(54),
    width: px(6),
    height: px(151),
    backgroundColor: '#E9ECEF',
  },
  line: {
    width: px(256),
    height: px(2),
    backgroundColor: '#22AAEF',
    marginTop: px(120),
  },
  linear: {
    width: px(256),
    height: px(82),
  },
  buttonstyle: {
    width: px(300),
    height: px(40),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    marginTop: px(350),
    marginBottom: px(22),
    alignSelf: 'center',
  },
  cameraStyle: {
    width: px(98),
    height: px(98),
    position: 'relative',
    left: '50%',
    marginLeft: px(-49),
    marginTop: px(-135),
  },
  cardSample: {
    width: px(258),
    height: px(164),
    alignSelf: 'center',
  },
})
