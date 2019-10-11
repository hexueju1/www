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
import { launchCamera } from '../../utils/MyPhotoSelectUtils'
import * as Progress from 'react-native-progress'
export default class IDCardScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      centerImage: images.idcard_sample,
      uploadProgress: 0,
    }
  }

  takePhoto = () => {
    launchCamera().then((source) => {
      this.setState({
        centerImage: source,
      })
    })
  }

  // 上传成功
  successResponse = (xhr) => {
    showToast('图片上传成功')
  }
  //上传失败
  failResponse = (err) => {
    console.log('failResponse')
    console.log(err)
  }

  startUpload(responseJson) {
    let ossbase = responseJson.data.dir + 'authentication/idcard/' + responseJson.data.number + '_front.jpg'
    console.log('target:' + responseJson.data.host + '/' + ossbase)

    const uploadMediaData = new FormData()
    uploadMediaData.append('OSSAccessKeyId', responseJson.data.accessid)
    uploadMediaData.append('policy', responseJson.data.policy)
    uploadMediaData.append('Signature', responseJson.data.signature)
    uploadMediaData.append('key', ossbase)
    uploadMediaData.append('success_action_status', 200)
    uploadMediaData.append('file', {
      uri: this.state.centerImage.uri,
      type: 'multipart/form-data',
      name: 'file',
    })

    //开始上传
    const OSS_UPLOAD_URI = responseJson.data.host
    this.futch(
      OSS_UPLOAD_URI,
      {
        method: 'POST',
        body: uploadMediaData,
        extra: null,
      },
      (progressEvent) => {
        // progress 就是上穿的进度， 更新 state 里面的uploadProgress
        const progress = progressEvent.loaded / progressEvent.total
        console.log('progress = ' + progress)
        this.setState({
          uploadProgress: progress,
        })
      },
      (xhr) => this.successResponse(xhr),
      this.failResponse,
    ).then((res) => console.log(res), (err) => showToast('图片上传失败'))
  }

  //这个方法就是具体上传的代码了
  futch = (url, opts = {}, onProgress, successResponse, failResponse) => {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest()
      xhr.open(opts.method || 'get', url)
      for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k])
      xhr.onload = (e) => res(e)
      xhr.onreadystatechange = (e) => {
        console.log('onreadystatechange')
        if (xhr.readyState !== 4) {
          return
        }
        //阿里云的状态码200 才有返回的信息
        if (xhr.status === 200) {
          xhr.extra = opts.extra
          successResponse(xhr)
        } else {
          xhr.extra = opts.extra
          failResponse(xhr)
        }
      }
      xhr.onerror = rej
      if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress
      xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      xhr.send(opts.body)
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
        <TabHeader text="身份认证" />
        {/* 身份认证文字内容 */}
        <View style={{ marginTop: px(45) }}>
          <Text style={styles.textcontent}>请确保本人身份证</Text>
          <Text style={styles.textcontent}>请正对拍摄头，确保图片清晰、文字清晰。</Text>
        </View>
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
          full
          style={styles.buttonstyle}
          onPress={() => {
            if (this.state.centerImage == images.idcard_sample) {
              showToast('请先上传照片')
              return
            }
            MyHttpUtils.fetchRequest('post', endpoint.oss.get_signature).then((responseJson) => {
              this.startUpload(responseJson)
            })
          }}
        >
          <Text style={{ color: color.white, fontSize: sp(16) }}>确定</Text>
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
    top: px(-2),
    left: px(54),
    width: px(151),
    height: px(2),
    backgroundColor: '#E9ECEF',
  },
  bottomBorder: {
    position: 'absolute',
    top: px(176),
    left: px(54),
    width: px(151),
    height: px(2),
    backgroundColor: '#E9ECEF',
  },
  leftBorder: {
    position: 'absolute',
    left: px(-2),
    top: px(54),
    width: px(2),
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: px(256),
    top: px(54),
    width: px(2),
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  buttonstyle: {
    width: px(300),
    height: px(40),
    backgroundColor: '#ABABAB',
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
})
