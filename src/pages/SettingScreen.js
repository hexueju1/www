/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { TouchableHighlight, ScrollView, DeviceEventEmitter, SafeAreaView, Image, StyleSheet, Text, View, Alert, Button ,TouchableOpacity} from 'react-native'
import { color, size, layout, style } from '../common/MyStyle'
import { event } from '../common/Constants'
import LoginManager from '../common/LoginManager'
import { isDebug } from '../utils/MyDebugUtils'
import SettingItem from '../components/SettingItem'
import BaseScreen from '../components/BaseScreen';
export default class SettingScreen extends BaseScreen {
  static navigationOptions = () => ({
    title: '设置',
  })

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <ScrollView>
            <SettingItem
                imageUrl={require('../images/tabbar/personal.png')}
                text={'银行卡管理'}
                onPress={() => {
                if (LoginManager.isLogin()) {
                    
                } else {
                    this.props.navigation.navigate('Login')
                }
                }}
            />
          <SettingItem
            imageUrl={require('../images/tabbar/personal.png')}
            text={'关于我们'}
            onPress={() => {
              if (LoginManager.isLogin()) {

              } else {
                this.props.navigation.navigate('Login')
              }
            }}
          />
          <View style={{ height: 15, backgroundColor: color.divide_line }} />
          <TouchableOpacity style={styles.button}
            onPress={()=>{alert(1)}}
          >
            <Text style={styles.buttonTExt}>退出登录</Text>
          </TouchableOpacity> 

        </ScrollView>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    let that = this
  }

  componentWillUnmount() {}
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  button :{
    height:40,
    flex:1,
    justifyContent:'center',
    backgroundColor:'green'
  },
  buttonTExt:{
    textAlign:'center',
    color:'black'
  }
})

