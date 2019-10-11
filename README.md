# jubaopen

# 接口文档

waiting

# 线上产品（uniapp）

waiting

# 不同版本UI适配

* 颜色适配：根据styleType统一在Mystyle解决，已有例子
* 图片适配：根据styleType统一在Constants解决，已有例子
* 整体布局有变化的，根据styleType返回不同的view

## 后台账号

https://shandaicn.com/admin/index/login.html
满天星后台登录：
用户名mantianxing
密码123123
信用花：fiveday
密码：921016
玫瑰花 threeday 921016

# 一些约定&规范（重要）

* 添加第三方库之后要检查Android和iOS两个平台
* 图片统一从Constants里面取
* 不要考虑状态栏，标题栏等通用组件。
* 提交之前先格式化
* 提交之前必须先pull，如有冲突先暂存代码再pull，然后恢复暂存解决冲突，然后再提交。
* MyHttpUtils中的showLoadingEndpoint数组存放需要loading的请求
* ui组件库 https://github.com/GeekyAnts/NativeBase
* 图片前缀和pages页面匹配(子目录也要匹配)
* 缩进为2个空格。
* 文件夹小写，文件名大写驼峰。
* 事件的发送和监听使用DeviceEventEmitter，事件名需要在Constants里面定义,一定要在componentWillUnmount里面remove掉监听的事件。
* http请求对应的url放在Constants.js的endpoint里面，根目录data下按照名称存放api返回数据方便查看
* 定时器必须在unmount的时候清理掉（clearTimeout/clearInterval）
* 屏幕适配使用import { px } from '../../utils/Device'，   设计稿长度为N，使用的时候就用px(N),  字体使用sp(N) 具体参考HomeScreen（首页）

# 目录结构

/src目录存放RN相关代码
  common 不同页面之间通用的一些方法和逻辑（如：登录信息）
    MyStyle.js 存放通用的颜色，尺寸等信息，所有可能多个地方用到的都在这里定义。
    LoginManager.js 管理用户状态相关信息(LoginManager.isLogin()判断是否登录)
  utils 项目无关的通用方法
  components 通用组件
    DismissKeyboardHOC 在包含输入框的页面作为顶部组件使用，方便键盘的收起。
  pages 页面逻辑代码（大驼峰命名），针对复杂模块可建立子目录
  images 资源目录（前缀用pages里面对应页面）
  tests js的一些测试代码

/android目录 android原生项目结构
/ios 目录 ios原生项目结构
原生项目结构在修改图标，启动页，接入第三方sdk，一些针对原生的特殊处理时会用到

/template 存放一些模板文件，开发新的页面直接复制即可


# 国际化(暂不考虑)

<!-- 基本使用：
import { I18n } from '../common/LanguageManager'
把文字替换成：
I18n.t('xxxxx')
并在src/language/对应文件中添加翻译字段

所有包含navigation的页面需要改写为：
  static navigationOptions = () => ({
    title: I18n.t('xxxxx')
  });
  
底部固定页面（首页，行情，理财，我的）的特殊处理参考MeScreen中refreshLanguage的逻辑 -->

# 快速点击问题

* 所有会触发http请求的点击不需要做任何多余的处理。
* 其他情况统一用callOnceInInterval包裹，具体使用直接在项目中搜索即可。

# 运行（Android）

* 复制local_sample.json为local.json到同级目录下,local.json为本地配置文件，不在版本控制范围内。

根目录依次执行
yarn (npm install也行)
yarn android
yarn log(查看日志)


# 注意事项

* 如果习惯于一直用Android开发，隔几天就要用iOS跑一下看会不会有问题，反之亦然。
* 如果Android安装新module之后运行报错，select 'File > Invalidate Caches / Restart' 

# 热更新

* https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide.md

基准包上传：
pushy uploadIpa <your-package.ipa>
pushy uploadApk <your-package.apk>
热更新打包&上传：
pushy bundle --platform android
pushy bundle --platform ios
热更新应用：
直接登录网页拖动对应版本到热更新版本即可

* 发布新包之后需要删除之前的版本并更新设置里面的下载链接

metaInfo:
是否提示用户重启
{"force": true}

* release版本才能正确热更新

# 常用资料

* https://react.docschina.org/
* https://reactnative.cn/docs/getting-started/
* https://reactnavigation.org/docs/zh-Hans/getting-started.html
* https://www.reactnavigation.org.cn/docs/guide-intro


# 发布线上版本CheckList

* 基准包已上传热更新后台
* 覆盖安装没问题

# 格式化&代码规范

* 格式化:Prettier(在保存时自动格式化) https://prettier.io/docs/en/options.html

# 打包

* 进入iOS目录下
* 安装fastlane（随便搜个教程即可，不要再次初始化，目前已经有相关配置文件）
* 安装firim的插件 fastlane add_plugin firim
* 打包： fastlane fir

# 其他命令

 react-native start --reset-cache