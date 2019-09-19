import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation' // Version can be specified in package.json
import HomeScreen from './src/pages/home/HomeScreen'
import MeScreen from './src/pages/MeScreen'
import SampleScreen from './src/template/SampleScreen'
import LoginScreen from './src/pages/account/LoginScreen'
import { event } from './src/common/Constants'
import { YellowBox, Image, BackHandler, ToastAndroid, DeviceEventEmitter } from 'react-native'
import { color, size, layout, style } from './src/common/MyStyle'
import UpdateManager from './src/common/UpdateManager'
import { isDebug } from './src/utils/MyDebugUtils'
import SplashScreen from 'react-native-splash-screen'
import MyWebView from './src/pages/MyWebView'
import NetworkManager from './src/common/NetworkManager'
import SettingScreen from './src/pages/SettingScreen'
import RepaymentScreen from './src/pages/repayment/RepaymentScreen'
import BorrowDetailScreen from './src/pages/repayment/BorrowDetailScreen'
import MyMsgScreen from './src/pages/msg/MyMsgScreen'
import LoginManager from './src/common/LoginManager'

YellowBox.ignoreWarnings(['Warning: ListView is deprecated', 'Module RCTImageLoader'])

console.log('start app')

/**
 * 有些页面有不同的入口，这些页面统一放在这里
 */
const commonPages = {
  Web: MyWebView,
  Login: LoginScreen,
  Sample: SampleScreen,
  Setting: SettingScreen,
  MyMsg: MyMsgScreen,
}

// StackNavigator用于实现各个页面之间的跳转
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    ...commonPages,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: style.defaultNavigation,
    headerLayoutPreset: 'center',
  },
)
HomeStack.navigationOptions = () => ({
  // 隐藏
  // tabBarVisible: false,
  tabBarLabel: '首页',
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        style={{ width: 26, height: 26 }}
        source={focused ? require('./src/images/tabbar/borrow-select.png') : require('./src/images/tabbar/borrow.png')}
      />
    )
  },
})

// 还款tab
const RepaymentStack = createStackNavigator(
  {
    Repayment: RepaymentScreen,
    BorrowDetail: BorrowDetailScreen,
    ...commonPages,
  },
  {
    initialRouteName: 'Repayment',
    defaultNavigationOptions: style.defaultNavigation,
    headerLayoutPreset: 'center',
  },
)
RepaymentStack.navigationOptions = () => ({
  // 隐藏
  // tabBarVisible: false,
  tabBarLabel: '借款',
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        style={{ width: 26, height: 26 }}
        source={focused ? require('./src/images/tabbar/also-select.png') : require('./src/images/tabbar/also.png')}
      />
    )
  },
})

// 我的tab
const MeStack = createStackNavigator(
  {
    Me: MeScreen,
    ...commonPages,
  },
  {
    initialRouteName: 'Me',
    defaultNavigationOptions: style.defaultNavigation,
    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      tabBarLabel: '个人',
      cardStyle: { backgroundColor: color.change },
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <Image
            style={{ width: 26, height: 26 }}
            source={focused ? require('./src/images/tabbar/personal-select.png') : require('./src/images/tabbar/personal.png')}
          />
        )
      },
    }),
  },
)

//TabNavigator用来实现同一个页面上不同界面的切换
const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      HomeStack,
      RepaymentStack,
      MeStack,
    },
    {
      lazy: false,
      backBehavior: 'none',
      tabBarOptions: {
        activeTintColor: color.up,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: color.white,
        },
      },
    },
  ),
)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }

  constructor(props) {
    super(props)
    setTimeout(SplashScreen.hide, 1000)
    this.onBackAndroid = this.onBackAndroid.bind(this)
  }

  componentWillMount() {
    NetworkManager.init()
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    LoginManager.checkCookieAndUpdateProfile()
    // 正式包去除一些log
    if (!isDebug()) {
      UpdateManager.checkUpdate(true)
      global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    this.languageListener.remove()
  }

  onBackAndroid = () => {
    // if (this.props.navigation.state.routeName == "Main") {//写入当前页面的路由信息
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
      //最近2秒内按过back键，可以退出应用。
      UpdateManager.restart()
      BackHandler.exitApp() //退出整个应用
      return false
    }
    this.lastBackPressed = Date.now() //按第一次的时候，记录时间
    ToastAndroid.show('再按一次退出App', ToastAndroid.SHORT) //显示提示信息
    return true
  }
}
