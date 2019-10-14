import { Dimensions, StatusBar } from 'react-native'
import { Header } from 'react-navigation'
import { getStatusBarHeight } from '../utils/Device'
const { width, height } = Dimensions.get('window')

/**
 * 0 正常UI
 * 1 商务UI
 */
export const styleType = 0

// 用于存放整个项目的全部颜色,建议下载对应插件实时查看颜色
export var color = {
  item_pressed: '#f5f5f5',
  text_0f: '#0F0F0F',
  header_text: '#0F0F0F',
  transparent: 'rgba(0, 0, 0, 0)',
  white: '#fff',
  primary_bg: '#F58C00',
  transparent_primary_bg: 'rgba(53, 59, 65, 0.5)',
  transparent_primary_bg_dark: 'rgba(53, 59, 65, 0.9)',
  divide_bg: '#EFEFEF',
  divide_line: '#e8e8e8',
  primary_text: '#F58C00',
  black: '#000',
  hint: '#93989d',
  white_gray: '#F0F0F0',
  home_data_text: '#474747',
}

if (styleType == 1) {
  color.primary_bg = '#EC5C61'
  color.primary_text = '#EC5C61'
  color.header_text = '#FDFDFD'
}

// size：用于存放整个项目的通用大小，比如说行高、间距、字体大小等公共的数值参数。
export const size = {
  margin_border: 20,
  screen_width: width,
  screen_height: height,
  // 导航高度
  navigation_height: Header.HEIGHT,
  // 状态栏高度
  statusbar_height: getStatusBarHeight(),
  font: 12,
  font_14: 14,
  font_small: 12,
  font_normal: 14,
  font_big: 16,
  font_big_title: 36,
  button_height: 45,
  border_height: 2,
  login_height: 184,
  login_pic_height: 60,
  login_pic_width: 79,
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
    header: null,
    // headerTitleContainerStyle: {
    //   left: TITLE_OFFSET,
    //   right: TITLE_OFFSET,
    // }
  },
}
