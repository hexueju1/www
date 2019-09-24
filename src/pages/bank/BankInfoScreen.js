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
import { endpoint } from '../../common/Constants'
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
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text>{item.bank_name}</Text>
          <Text>{item.card_number}</Text>
          <Text>{item.card_type}</Text>
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
  },
})
