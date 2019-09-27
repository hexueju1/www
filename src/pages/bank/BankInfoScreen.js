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
  SafeAreaView,
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
            <Image style={{ width: 45, height: 35 }} source={images.bank_logo} />
            <Text style={{ alignSelf: 'center', marginTop: 10 }}>卡号</Text>
          </View>
          <View style={styles.idstyle}>
            <View style={{ flexDirection: 'row',width:200 }}>
              <Text style={{ flex: 1 }}>{item.bank_name}</Text>
              <Text>{item.card_type}</Text>
            </View>
            <Text style={{ paddingTop: 18 }}>{ctime1.substr(0, 3) + '*********' + ctime1.substring(12)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="我的卡片" />
        <FlatList
          data={this.state.datalist}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
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
    height: 88,
    marginHorizontal: 20,
    backgroundColor: '#FDFDFD',
    marginTop: 13,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingTop: 11,
  },
  idstyle: {
    paddingLeft: 61,
    paddingTop: 5,
    flexDirection: 'column',
  },
})
