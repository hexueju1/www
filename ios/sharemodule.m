
#import "sharemodule.h"

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
//#import <ShareSDK/NSMutableDictionary+SSDKShare.h>
#import <ShareSDK/ShareSDK.h>
#import <SVProgressHUD.h>

@implementation sharemodule
RCT_EXPORT_MODULE(sharemodule)

/**
 * 图片分享
 */
RCT_EXPORT_METHOD(shareImage:(NSString*)imagePath shareMsg:(NSString*)shareMsg platformType:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
  //1、创建分享参数（必要）
  UIImage * image = [UIImage imageWithContentsOfFile:imagePath];
  NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
  [shareParams SSDKSetupShareParamsByText:@"分享内容"
                                   images:image
                                      url:[NSURL URLWithString:@"http://mob.com"]
                                    title:@"分享标题"
                                     type:SSDKContentTypeImage];
  

  // 定制微信好友的分享内容
//  [shareParams SSDKSetupWeChatParamsByText:@"Share SDK Link Desc"
//                                     title:@"Share SDK"
//                                       url:[NSURL URLWithString:@"https://www.mob.com"]
//                                thumbImage:nil
//                                     image:image
//                              musicFileURL:nil
//                                   extInfo:nil
//                                  fileData:nil
//                              emoticonData:nil
//                       sourceFileExtension:nil
//                            sourceFileData:nil
//                                      type:SSDKContentTypeImage
//                        forPlatformSubType:SSDKPlatformSubTypeWechatSession];
  
  SSDKPlatformType targetType = SSDKPlatformTypeWechat;
  switch (platformType) {
    case 1:
      targetType = SSDKPlatformTypeWechat;
      break;
    case 2:
      targetType = SSDKPlatformSubTypeWechatTimeline;
      break;
    case 3:
      targetType = SSDKPlatformTypeTelegram;
//      21、Telegram
//      提示：调用系统客户端分享，所以无法返回准确回调，取消分享也会提示成功回调。
//      或者只分享文字
//      分享文字  text
//      分享图片  imagePath("/sdcard/abc.png")
//      imageUrl("网路图片链接")
      [shareParams SSDKSetupShareParamsByText:@"Welcome"
                                       images:nil
                                          url:[NSURL URLWithString:shareMsg]
                                        title:@"Welcome"
                                         type:SSDKContentTypeWebPage];
      break;
    default:
      targetType = SSDKPlatformTypeWechat;
      break;
  }
  
  [ShareSDK share:targetType parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
    
    switch (state) {
      case SSDKResponseStateUpload:
        NSLog(@"-- SSDKResponseStateUpload %@",error.description);
        // 分享视频的时候上传回调，进度信息在 userData
        break;
      case SSDKResponseStateSuccess:
        NSLog(@"-- SSDKResponseStateSuccess %@",error.description);
        callback( [[NSArray alloc] initWithObjects:@"Success", nil]);
        //成功
        break;
      case SSDKResponseStateFail:{
//        [SVProgressHUD showInfoWithStatus:error.description];
//        [SVProgressHUD dismissWithDelay:2.0];
        NSLog(@"-- SSDKResponseStateFail %@",error.description);
        callback( [[NSArray alloc] initWithObjects:error.description, nil]);
        //失败
        break;
      }
      case SSDKResponseStateCancel:
        NSLog(@"-- SSDKResponseStateCancel %@",error.description);
        //取消
        break;
        
      default:
        break;
    }
  }];
//  [ShareSDK showShareActionSheet:nil
//                     customItems:nil
//                     shareParams:shareParams
//              sheetConfiguration:nil
//                  onStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType,
//                                   NSDictionary *userData, SSDKContentEntity *contentEntity,
//                                   NSError *error, BOOL end) {
//
//                  }];
//  //创建分享消息对象
//  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
//  //创建图片内容对象
//  UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
//  //如果有缩略图，则设置缩略图本地
//  UIImage * image = [UIImage imageWithContentsOfFile:imagePath];
//  shareObject.thumbImage = image;
//  [shareObject setShareImage:image];
//  //分享消息对象设置分享内容对象
//  messageObject.shareObject = shareObject;
//
//  dispatch_async(dispatch_get_main_queue(), ^{
//
//    //调用分享接口
//    [[UMSocialManager defaultManager] shareToPlatform:[self configPlatform: platformType] messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
//      NSString *message = @"分享成功";
//      if (error) {
//        UMSocialLogInfo(@"************Share fail with error %@*********",error);
//        message = @"分享失败";
//      }else{
//        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
//          UMSocialShareResponse *resp = data;
//          //分享结果消息
//          UMSocialLogInfo(@"response message is %@",resp.message);
//          //第三方原始返回的数据
//          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
//
//        }else{
//          UMSocialLogInfo(@"response data is %@",data);
//        }
//      }
//      callback( [[NSArray alloc] initWithObjects:message, nil]);
//    }];
//
//  });
}

// 图文分享
RCT_EXPORT_METHOD(share:(NSString*)title descr:(NSString*)descr
                  webpageUrl:(NSString*)webpageUrl
                  thumbURL:(NSString*)thumbURLl
                  NSInteger:(NSInteger)platformType
                  callback:(RCTResponseSenderBlock)callback
                  )
{
//  //创建分享消息对象
//  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
//  //创建网页内容对象
//  NSString* thumbURL =  thumbURLl;
//  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURL];
//  //设置网页地址
//  shareObject.webpageUrl = webpageUrl;
//  //分享消息对象设置分享内容对象
//  messageObject.shareObject = shareObject;
//
//  dispatch_async(dispatch_get_main_queue(), ^{
//    //调用分享接口
//    [[UMSocialManager defaultManager] shareToPlatform: [self configPlatform: platformType]  messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
//      NSString *message = @"分享成功";
//      if (error) {
//        UMSocialLogInfo(@"************Share fail with error %@*********",error);
//        if(error.code == 2009){
//          message = @"取消分享";
//        }else{
//          message = @"分享失败";
//        }
//      }else{
//        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
//          UMSocialShareResponse *resp = data;
//          //分享结果消息
//          UMSocialLogInfo(@"response message is %@",resp.message);
//          //第三方原始返回的数据
//          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
//          //          code = @"200";
//          //          message = resp.originalResponse;
//        }else{
//          UMSocialLogInfo(@"response data is %@",data);
//        }
//
//      }
//      callback( [[NSArray alloc] initWithObjects:message, nil]);
//    }];
//
//  });
}

// 官方不推荐使用该方式
//RCT_EXPORT_METHOD(authLogin:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
//  [[UMSocialManager defaultManager] authWithPlatform: [self configPlatform:platformType] currentViewController:nil completion:^(id result, NSError *error) {
//
//    NSDictionary *userdata = nil;
//    NSNumber *code = @0;
//
//    if(error){
//      code = @1;
//      userdata = @{
//                   @"code": code
//                   };
//    } else {
//      UMSocialAuthResponse *authresponse = result;
//
//      userdata = @{
//                   @"code": code,
//                   @"uid": authresponse.uid,
//                   @"accessToken": authresponse.accessToken
//                   };
//    }
//    callback( [[NSArray alloc] initWithObjects: userdata, nil]);
//  }];
//}
//
//// 授权第三方登录
//RCT_EXPORT_METHOD(authLogin: (NSInteger) platformType callback: (RCTResponseSenderBlock) callback) {
//
//  [[UMSocialManager defaultManager] getUserInfoWithPlatform: [self configPlatform: platformType]  currentViewController:nil completion:^(id result, NSError *error) {
//
//      NSNumber *code = @0;
//      NSDictionary *userdata = nil;
//      if(error) {
//        code = @1;
//        userdata = @{
//                     @"code": code
//                   };
//      } else {
//        UMSocialUserInfoResponse *userinfo = result;
//        userdata = @{
//                       @"code": code,
//                       @"userId": userinfo.uid,
//                       @"accessToken": userinfo.accessToken,
//                       @"userName": userinfo.name,
//                       @"userAvatar": userinfo.iconurl,
//                       @"userGender": userinfo.gender
//                     };
//
//      }
//     callback( [[NSArray alloc] initWithObjects: userdata, nil]);
//  }];
//
//}

@end

