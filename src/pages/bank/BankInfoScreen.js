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
import TabHeader from '../../common/TabHeader'

export default class BankInfoScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      datalist: [],
    }
  }

  renderItem = ({ item }) => {
    let ctime1 = item.card_number
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.itemstyle}>
          <View>
            <Image style={{ width: px(45), height: px(35) }} source={images.bank_logo} />
            <Text style={{ alignSelf: 'center', marginTop: px(10) }}>卡号</Text>
          </View>
          <View style={styles.idstyle}>
            <View style={{ flexDirection: 'row', width: px(200) }}>
              <Text style={{ flex: 1 }}>{item.bank_name}</Text>
              <Text>{item.card_type}</Text>
            </View>
            <Text style={{ paddingTop: px(18) }}>{ctime1.substr(0, 3) + '*********' + ctime1.substring(12)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="我的卡片" />
        <FlatList
          data={this.state.datalist}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.user.bankinfo).then((responseJson) => {
      this.setState({
        datalist: responseJson.data.rows,
      })
    })
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
  itemstyle: {
    height: px(88),
    marginHorizontal: px(20),
    backgroundColor: '#FDFDFD',
    marginTop: px(13),
    borderRadius: px(8),
    paddingHorizontal: px(15),
    flexDirection: 'row',
    paddingTop: px(11),
  },
  idstyle: {
    paddingLeft: px(61),
    paddingTop: px(5),
    flexDirection: 'column',
  },
})
