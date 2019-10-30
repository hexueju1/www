import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter, Dimensions } from 'react-native'
import posed from 'react-native-pose' // react-native 动画库
import { color } from './MyStyle'
import { px, isIphoneX, sp } from '../utils/Device'
import { event } from './Constants'
import LoginManager from './LoginManager'

const Scaler = posed.View({
  // 定义点击缩放
  active: { scale: 1 },
  inactive: { scale: 0.9 },
})

const TabBar = (props) => {
  const { renderIcon, getLabelText, activeTintColor, inactiveTintColor, onTabPress, onTabLongPress, getAccessibilityLabel, navigation } = props

  const { routes, index: activeRouteIndex } = navigation.state
  return (
    <Scaler style={Styles.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
        return (
          <TouchableOpacity
            key={routeIndex}
            style={Styles.tabButton}
            onPress={() => {
              console.log(route.key)
              onTabPress({ route })
            }}
            onLongPress={() => {
              onTabLongPress({ route })
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {route.key == 'HomeStack' ? (
              <Scaler style={Styles.scalerHome} pose={isRouteActive ? 'active' : 'inactive'}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                {/* <Text style={Styles.iconText}>{getLabelText({ route })}</Text> */}
              </Scaler>
            ) : route.key == 'RepaymentStack' ? (
              <Scaler style={Styles.scalerBig} pose={isRouteActive ? 'active' : 'inactive'}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                {/* <Text style={Styles.iconText}>{getLabelText({ route })}</Text> */}
                {LoginManager.expire_borrow_sn != undefined ? (
                  <View style={Styles.info}>
                    <Text style={Styles.infotext}>您已逾期</Text>
                  </View>
                ) : null}
              </Scaler>
            ) : (
              // 普通图标普通处理
              <Scaler style={Styles.scaler} pose={isRouteActive ? 'active' : 'inactive'}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                <Text style={Styles.iconText}>{getLabelText({ route })}</Text>
              </Scaler>
            )}
          </TouchableOpacity>
        )
      })}
    </Scaler>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: isIphoneX() ? px(63) : px(53),
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#EEEEEE',
    // shadowOffset: { width: 5, height: 10 },
    // shadowOpacity: 0.75,
    elevation: 1,
    paddingBottom: isIphoneX() ? px(10) : 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaler: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 首页
  scalerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 中间图标，特殊处理
  scalerBig: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: px(10),
  },
  iconText: {
    fontSize: 12,
    lineHeight: 20,
  },
  info: {
    width: px(68),
    height: px(28),
    backgroundColor: '#ED0909',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(14),
    position: 'absolute',
    left: px(45),
    top: px(-10),
  },
  infotext: {
    color: '#FDFDFD',
    fontSize: sp(12),
  },
})

export default TabBar
