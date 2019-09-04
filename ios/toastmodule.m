
#import "toastmodule.h"

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <SVProgressHUD.h>

@implementation toastmodule
RCT_EXPORT_MODULE(toastmodule)


RCT_EXPORT_METHOD(showToast:(NSString*)msg){
  [SVProgressHUD showInfoWithStatus:msg];
  [SVProgressHUD dismissWithDelay:2.0];
}

@end

