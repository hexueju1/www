import { Dimensions, StatusBar } from 'react-native'
import { Header } from 'react-navigation'
const { width, height } = Dimensions.get('window')

// 用于存放整个项目的全部颜色,建议下载对应插件实时查看颜色
export const color = {
  // 透明
  text_0f: '#0F0F0F',
  transparent: 'rgba(0, 0, 0, 0)',
  white: '#fff',
  primary_bg: '#E7912D',
  transparent_primary_bg: 'rgba(53, 59, 65, 0.5)',
  transparent_primary_bg_dark: 'rgba(53, 59, 65, 0.9)',
  divide_bg: '#EFEFEF',
  divide_line: '#e8e8e8',
  primary_text: '#E7912D',
  black: '#000',
  hint: '#93989d',
  white_gray: '#F0F0F0',

  home_data_text: '#474747',
  // 涨跌幅颜色，一些按钮也会用到
  up: '#00acdc',
  down: '#f04a5d',
  change: '#FF9AFF',
  //边框颜色
  border_line: '#f3f3f3',
  yellow: '#f7d800',
  dark_yellow: '#E0B23E',
  pink: 'pink',
  item_pressed: '#f5f5f5',
}

// size：用于存放整个项目的通用大小，比如说行高、间距、字体大小等公共的数值参数。
export const size = {
  margin_border: 20,
  screen_width: width,
  screen_height: height,
  // 导航高度
  navigation_height: Header.HEIGHT,
  // 状态栏高度
  statusbar_height: StatusBar.currentHeight,
  font: 12,
  font_14: 14,
  font_small: 12,
  font_normal: 14,
  font_big: 16,
  font_big_title: 30,
  button_height: 45,
  border_height: 2,
}

// layout：用于存放整个项目的公共布局，例如控制布局的flex属性、通用的padding、margin、position定位。

export const layout = {}

// const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

// 一些通用style
export const style = {
  // 默认导航样式
  defaultNavigation: {
    headerTitleStyle: { color: color.text_0f, flex: 1, textAlign: 'center', alignSelf: 'center' },
    headerStyle: { backgroundColor: color.primary_text },
    headerTintColor: color.text_0f,
    headerBackTitle: null,
    // headerTitleContainerStyle: {
    //   left: TITLE_OFFSET,
    //   right: TITLE_OFFSET,
    // }
  },
  buttonStyle: {
    fontSize: 20,
    color: color.white,
  },
  buttonContainer: {
    marginTop: 20,
    padding: 10,
    height: size.button_height,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: color.up,
  },
}
