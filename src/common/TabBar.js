import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import posed from 'react-native-pose' // react-native 动画库
import { color } from './MyStyle'
import { px } from '../utils/Device'

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
    height: 53,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#EEEEEE',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.75,
    elevation: 1,
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
})

export default TabBar
