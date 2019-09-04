import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewPropTypes
} from 'react-native'

export default class extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    titleSize: PropTypes.number,
    verticalWidth: PropTypes.number,
    onPress: PropTypes.func,
    verticalHeight: PropTypes.number,
    horizontalWidth: PropTypes.number,
    horizontalHeight: PropTypes.number,
    orientation: PropTypes.string,
    activeColor: PropTypes.string,
    inActiveColor: PropTypes.string,
    textActiveColor: PropTypes.string,
    textInActiveColor: PropTypes.string,
    selected: PropTypes.number,
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    style: ViewPropTypes.style
    
  };

  static defaultProps = { // 返回默认的一些属性值
    data: ['One', 'Two', 'Three'],
    verticalWidth: 100,
    verticalHeight: 120,
    horizontalWidth: 200,
    horizontalHeight: 34,
    borderRadius: 5,
    titleSize: 14,
    orientation: 'horizontal',
    borderColor: 'gray',
    activeColor: 'red',
    selected: 0,
    textActiveColor: 'white',
    onPress () {}
  };

  renderTabOption (tab, index) {
    const {orientation, onPress, activeColor, inActiveColor, titleSize, textActiveColor, textInActiveColor, selected, borderRadius, borderColor} = this.props
    const styles = createStyle(borderRadius)
    const isTabActive = selected === index
    const textColor = isTabActive ? (textActiveColor || inActiveColor) : (textInActiveColor || activeColor)
    const itemStyle = orientation === 'horizontal'
    ? (index === 0
        ? [styles.horizontalStartItem, {borderWidth: 1}]
        : (index < this.props.data.length - 1
            ? [{borderWidth: 1, borderLeftWidth: 0}]
            : [styles.horizontalEndItem, {borderWidth: 1, borderLeftWidth: 1, marginLeft: -1}]
          )
      )
    : (index === 0
        ? [styles.verticalStartItem, {borderWidth: 1}]
        : (index < this.props.data.length - 1
            ? [{borderWidth: 1, borderTopWidth: 0}]
            : [styles.verticalEndItem, {borderWidth: 1, borderTopWidth: 0, marginTop: -1}]
          )
      )

    return (
      <TouchableOpacity key={index}
        onPress={() => onPress(index)}
        activeOpacity={1}
        style={[styles.item, {backgroundColor: (isTabActive ? activeColor : inActiveColor), borderColor: borderColor}, ...itemStyle]}>
        <Text style={{color: textColor, fontSize: titleSize}}>{tab}</Text>
      </TouchableOpacity>)
  }

  render () {
    const {verticalHeight, verticalWidth, horizontalHeight, horizontalWidth, data, orientation} = this.props

    const style = orientation === 'horizontal'
    // ? [{height: horizontalHeight, width: horizontalWidth, flexDirection: 'row'}]
    ? [{height: horizontalHeight, flexDirection: 'row'}]
    : [{width: verticalWidth, height: verticalHeight, flexDirection: 'column'}]
    return (
      <View style={[...style, {backgroundColor: 'transparent'}, {borderWidth: 0}, this.props.style]}>
        {data.map((item, index) => this.renderTabOption(item, index))}
      </View>
    )
  }
}

function createStyle (borderRadius) {
  return StyleSheet.create({
    item: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    horizontalStartItem: {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    },
    horizontalEndItem: {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    },
    verticalStartItem: {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    verticalEndItem: {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    }
  })
}