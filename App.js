import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation' // Version can be specified in package.json
import HomeScreen from './src/pages/home/HomeScreen'
import MeScreen from './src/pages/account/MeScreen'
import SampleScreen from './src/template/SampleScreen'
import LoginScreen from './src/pages/account/LoginScreen'
import AboutScreen from './src/pages/account/AboutScreen'
import { event } from './src/common/Constants'
import { YellowBox, Image, BackHandler, ToastAndroid, DeviceEventEmitter } from 'react-native'
import { color, size, layout, style } from './src/common/MyStyle'
import UpdateManager from './src/common/UpdateManager'
import { isDebug } from './src/utils/MyDebugUtils'
import SplashScreen from 'react-native-splash-screen'
import MyWebView from './src/pages/MyWebView'
import NetworkManager from './src/common/NetworkManager'
import BorrowScreen from './src/pages/borrow/BorrowScreen'
import MyMsgScreen from './src/pages/msg/MyMsgScreen'
import MsgDetailScreen from './src/pages/msg/MsgDetailScreen'
import PermissionRequestScreen from './src/pages/permission/PermissionRequestScreen'
import IDCardScreen from './src/pages/idcard/IDCardScreen'
import BankInfoScreen from './src/pages/bank/BankInfoScreen'
import OperatorScreen from './src/pages/operator/OperatorScreen'
import BorrowConfirmScreen from './src/pages/borrow/BorrowConfirmScreen'
import BorrowDetailScreen from './src/pages/borrow/BorrowDetailScreen'
import BorrowHistoryScreen from './src/pages/borrow/BorrowHistoryScreen'
import LoginManager from './src/common/LoginManager'
import TabBar from './src/common/TabBar'
import { px } from './src/utils/Device'
import PersonalPictureScreen from './src/pages/idcard/PersonalPictureScreen'
import VerificationScreen from './src/pages/operator/VerificationScreen'
import BankCardScreen from './src/pages/bankcard/BankCardScreen'
import CertificationStatusScreen from './src/pages/certificationstatus/CertificationStatusScreen'
import BillDetailScreen from './src/pages/borrow/BillDetailScreen'
import BorrowSuccessScreen from './src/pages/borrow/BrrowSuccessScreen'
import BorrowScheduleScreen from './src/pages/borrow/BorrowScheduleScreen'
import AccountedScreen from './src/pages/borrow/AccountedScreen'
import RepaymentScreen from './src/pages/repayment/RepaymentScreen'
import MyCameraScreen from './src/pages/common/MyCameraScreen'
import PermissionOperatorScreen from './src/pages/permission/PermissionOperatorScreen'
import PermissionBorrowScreen from './src/pages/permission/PermissionBorrowScreen'

YellowBox.ignoreWarnings(['Warning: ListView is deprecated', 'Module RCTImageLoader'])

console.log('start app')

/**
 * 有些页面有不同的入口，这些页面统一放在这里
 */
const commonPages = {
  Web: MyWebView,
  BorrowDetail: BorrowDetailScreen,
  MsgDetail: MsgDetailScreen,
  BankInfo: BankInfoScreen,
  About: AboutScreen,
  Login: LoginScreen,
  Sample: SampleScreen,
  MyMsg: MyMsgScreen,
  PermissionRequest: PermissionRequestScreen,
  BorrowConfirm: BorrowConfirmScreen,
  BorrowHistory: BorrowHistoryScreen,
  IDCard: IDCardScreen,
  Operator: OperatorScreen,
  PersonalPicture: PersonalPictureScreen,
  Verification: VerificationScreen,
  BankCard: BankCardScreen,
  CertificationStatus: CertificationStatusScreen,
  BillDetail: BillDetailScreen,
  BorrowSuccess: BorrowSuccessScreen,
  BorrowSchedule: BorrowScheduleScreen,
  AccountedS: AccountedScreen,
  Repayment: RepaymentScreen,
  Home: HomeScreen,
  MyCamera: MyCameraScreen,
  PermissionOperator: PermissionOperatorScreen,
  PermissionBorrow: PermissionBorrowScreen,
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
HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index == 0,
  tabBarLabel: '首页',
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        style={{ width: px(34), height: px(34) }}
        source={focused ? require('./src/images/tabbar/home-select.png') : require('./src/images/tabbar/home-unselect.png')}
      />
    )
  },
})

// 还款tab
const RepaymentStack = createStackNavigator(
  {
    Borrow: BorrowScreen,
    // BorrowConfirm: BorrowConfirmScreen,
    ...commonPages,
  },
  {
    initialRouteName: 'Borrow',
    // initialRouteName: 'BorrowConfirm',
    defaultNavigationOptions: style.defaultNavigation,
    headerLayoutPreset: 'center',
  },
)
RepaymentStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index == 0,
  tabBarLabel: '借款',
  tabBarIcon: ({ tintColor, focused }) => {
    return (
      <Image
        style={{ width: px(69), height: px(69) }}
        source={focused ? require('./src/images/tabbar/also-select.png') : require('./src/images/tabbar/also-unselect.png')}
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
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index == 0,
      tabBarLabel: '个人',
      cardStyle: { backgroundColor: color.change },
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <Image
            style={{ width: px(20), height: px(20) }}
            source={focused ? require('./src/images/tabbar/personal-select.png') : require('./src/images/tabbar/personal-unselect.png')}
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
      tabBarComponent: TabBar,
      // initialRouteName: 'MeStack',
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
    return <AppContainer screenProps={{ refresh: this.state.needRefreshApp }} />
  }

  constructor(props) {
    super(props)
    this.state = {
      needRefreshApp: false,
    }
    setTimeout(SplashScreen.hide, 1000)
    this.onBackAndroid = this.onBackAndroid.bind(this)
  }

  componentWillMount() {
    NetworkManager.init()
    let that = this
    this.languageListener = DeviceEventEmitter.addListener(event.refreshAppState, function(data) {
      that.setState({
        needRefreshApp: true,
      })
    })

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
