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
import { launchCamera, uploadFileToOss } from '../../utils/MyPhotoSelectUtils'
import * as Progress from 'react-native-progress'

export default class IDCardScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      centerImage: images.idcard_sample,
      uploadProgress: 0,
      idcardPath: '',
      name: '***',
      id: '123456789012345678',
      status: true,
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
      this.setState({ status: false })
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
            idcardPath: urlPath,
          })
        },
      )
    })
    // this.setState({ hidden: '1' })
  }

  render() {
    let showcontent =
      this.state.status == true ? (
        <View style={{ marginTop: px(45) }}>
          <Text style={styles.textcontent}>请确保本人身份证</Text>
          <Text style={styles.textcontent}>请正对拍摄头，确保图片清晰、文字清晰。</Text>
        </View>
      ) : (
        <View style={{ marginTop: px(45) }}>
          <Text style={styles.textleft}>
            姓名：<Text>{this.state.name}</Text>
          </Text>
          <Text style={styles.textleft}>
            身份证：<Text>{this.state.id}</Text>
          </Text>
        </View>
      )
    let bottontext = this.state.status == true ? '上传身份证正面' : '下一步'
    return (
      <View style={styles.main_container}>
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
        <TabHeader text="身份认证" />
        {/* 身份认证文字内容 */}
        {showcontent}
        {/* 身份证图片 */}
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
          <Image style={styles.cardSample} source={this.state.centerImage} />
          <Image style={styles.cameraStyle} source={images.camera} />
        </TouchableOpacity>

        <Button
          disabled={this.state.status}
          full
          style={[styles.buttonstyle, { backgroundColor: this.state.status == false ? '#E7912D' : '#ABABAB' }]}
          onPress={() => {
            if (this.state.centerImage == images.idcard_sample) {
              showToast('请先上传照片')
              return
            }
            if (this.state.uploadProgress != 1) {
              showToast('请等待图片上传完成')
              return
            }
            if (this.state.status == false) {
              this.props.navigation.navigate('PersonalPicture', { idcardPath: this.state.idcardPath })
            }
          }}
        >
          <Text style={{ color: color.white, fontSize: sp(16) }}>{bottontext}</Text>
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
    height: px(180),
    borderWidth: px(2),
    borderColor: '#ABABAB',
    paddingTop: px(7),
    position: 'absolute',
    top: px(190),
    left: '50%',
    marginLeft: px(-130),
  },
  topBorder: {
    position: 'absolute',
    top: px(-3),
    left: px(54),
    width: px(151),
    height: px(6),
    backgroundColor: '#E9ECEF',
  },
  bottomBorder: {
    position: 'absolute',
    top: px(175),
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
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: px(256),
    top: px(54),
    width: px(6),
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  buttonstyle: {
    width: px(300),
    height: px(40),
    backgroundColor: '#E7912D',
    borderRadius: px(22),
    marginTop: px(264),
    marginBottom: px(22),
    alignSelf: 'center',
  },
  cameraStyle: {
    width: px(98),
    height: px(98),
    position: 'relative',
    left: '50%',
    marginLeft: px(-49),
    top: '-50%',
    marginTop: px(-49),
  },
  cardSample: {
    width: px(258),
    height: px(164),
    alignSelf: 'center',
  },
  textleft: {
    marginTop: px(10),
    left: '15%',
    color: '#ABABAB',
    fontSize: sp(16),
  },
})
