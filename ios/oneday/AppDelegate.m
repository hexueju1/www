/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTHotUpdate.h"
#import <ShareSDK/ShareSDK.h>
#import "RNSplashScreen.h"  // here

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    // 非DEBUG情况下启用热更新
    jsCodeLocation = [RCTHotUpdate bundleURL];
//    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"shandai"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

//  sharesdk
  [ShareSDK registPlatforms:^(SSDKRegister *platformsRegister) {
    //QQ
//    [platformsRegister setupQQWithAppId:@"100371282" appkey:@"aed9b0303e3ed1e27bae87c33761161d"];

    //微信
    [platformsRegister setupWeChatWithAppId:@"wx249f7ce7036fb51c" appSecret:@"1d8b39475f81eed6d73637ba7e433c61"];

    //Telegram
    [platformsRegister setupTelegramByBotToken:@"711031950:AAEHVp_CtrTAtC1rQ7tpD8SuEmh__p9yHak" botDomain:@"http://t.me/glenbit_dev_bot"];

}];
  //启动页
  [RNSplashScreen show];  // here
  return YES;
}

@end
