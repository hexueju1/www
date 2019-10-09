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
import SettingItem from '../../components/SettingItem'
import TabHeader from '../../common/TabHeader'
import CustomAlertDialog from '../../components/CustomAlertDialog'

const typeArr = ['日常消费', '装修', '教育', '旅游']
export default class BorrowConfirmScreen extends BaseScreen {
  // static navigationOptions = {
  //   title: '借款',
  // }

  constructor(props) {
    super(props)
    this.state = {
      money: '2,000.00',
      time: '1周',
      typeName: '借款用途',
      bank_name: '中国银行',
      type: 0,
      showTypePop: false,
    }
  }
  _openTypeDialog() {
    this.setState({ showTypePop: !this.state.showTypePop })
  }
  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="借款" />
        <ScrollView>
          <View style={styles.content}>
            <Text style={{ color: '#666666', fontSize: sp(12), fontWeight: 'bold' }}>当前可借多少（元）</Text>
            <Text style={{ color: '#111111', fontSize: sp(40), fontWeight: 'bold', marginTop: px(12) }}>{this.state.money}</Text>
            <View style={styles.daypay}>
              <Text style={{ color: '#ECAC3A', fontSize: px(16) }}>按日计息</Text>
              <Text style={{ color: '#ECAC3A', fontSize: px(10) }}>随借随还更灵活</Text>
            </View>
            <View style={styles.list}>
              <SettingItem text={'借多久'} rightText={this.state.time} hideImage />
              <SettingItem text={'借款用途'} rightText={this.state.typeName} onPress={() => this._openTypeDialog()} />
              <SettingItem text={'选择账户'} rightText={this.state.bank_name} hideImage />
            </View>
            <Button
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('BillDetail')
              }}
            >
              <Text style={{ fontSize: px(16) }}>下一步</Text>
            </Button>
            <CustomAlertDialog
              entityList={typeArr}
              callback={(i) => {
                this.setState({
                  type: i,
                  typeName: typeArr[i],
                })
              }}
              show={this.state.showTypePop}
              closeModal={(show) => {
                this.setState({
                  showTypePop: show,
                })
              }}
            />
          </View>
        </ScrollView>
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
  content: {
    alignItems: 'center',
    paddingTop: px(16),
  },
  daypay: {
    width: px(338),
    height: px(44),
    borderWidth: px(1),
    borderColor: '#ECAC3A',
    borderRadius: px(8),
    marginTop: px(33),
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: px(338),
    marginTop: px(25),
    marginHorizontal: px(19),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
  },
  button: {
    width: px(300),
    height: px(44),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: px(43),
  },
})
