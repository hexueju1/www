package com.thinktank.shan2dai.Share;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.telegram.Telegram;
import cn.sharesdk.wechat.friends.Wechat;
import cn.sharesdk.wechat.moments.WechatMoments;

public class ShareModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  private Context context;
  private static Activity mActivity;
  private static Handler mHandler = new Handler(Looper.getMainLooper());

  public static void initActivity(Activity activity) {
    mActivity = activity;
  }

  public ShareModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
  }

  private static void runOnMainThread(Runnable task) {
    mHandler.post(task);
  }

  @Override
  public String getName() {
    return "sharemodule";
  }

  /**
   * 分享手机本地图片
   */
  @ReactMethod
  public void shareImage(String imgPath, final int platform, final Callback resultCallback) {

    Platform.ShareParams sp = new Platform.ShareParams();
    // sp.setText("share123");
    sp.setImagePath(imgPath);
    // sp.setImageUrl("https://ws3.sinaimg.cn/large/8f1bd2b1jw1eox8yv9wg9j21kw11u1kx.jpg");
    Platform realPlatform;

    switch (platform) {
    case 1:
      realPlatform = ShareSDK.getPlatform(Wechat.NAME);
      break;
    case 2:
      realPlatform = ShareSDK.getPlatform(WechatMoments.NAME);
      break;
    case 3:
      realPlatform = ShareSDK.getPlatform(Telegram.NAME);
      break;
    default:
      realPlatform = ShareSDK.getPlatform(Wechat.NAME);
      break;
    }

    realPlatform.setPlatformActionListener(new PlatformActionListener() {
      @Override
      public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
        // Toast.makeText(context, "onComplete", Toast.LENGTH_LONG).show();
        resultCallback.invoke("Success");

      }

      @Override
      public void onError(Platform platform, int i, Throwable throwable) {
        // Toast.makeText(context, "onError", Toast.LENGTH_LONG).show();
        resultCallback.invoke("Failure");
        // java.lang.IllegalArgumentException: shareType = 0
      }

      @Override
      public void onCancel(Platform platform, int i) {
        resultCallback.invoke("onCancel");
        // Toast.makeText(context, "onCancel", Toast.LENGTH_LONG).show();

      }
    }); // 设置分享事件回调
    // 执行图文分享
    realPlatform.share(sp);

    // final SHARE_MEDIA sharePlatform = getSharePlatform(platform);
    // if(UMShareAPI.get(mActivity).isInstall(mActivity, sharePlatform)) {
    // Bitmap img =
    // BitmapFactory.decodeFile(BitMapUtil.getImageAbsolutePath(mActivity,
    // Uri.parse(imgPath)));
    // final UMImage image = new UMImage(mActivity, BitMapUtil.ImageCompress(img));
    // runOnMainThread(new Runnable() {
    // @Override
    // public void run() {
    // new ShareAction(mActivity)
    // .setPlatform(sharePlatform)
    // .withMedia(image)
    // .setCallback(new UMShareListener() {
    // @Override
    // public void onStart(SHARE_MEDIA share_media) {
    // //分享开始的回调
    // }
    //
    // @Override
    // public void onResult(SHARE_MEDIA share_media) {
    // resultCallback.invoke("分享成功");
    // }
    //
    // @Override
    // public void onError(SHARE_MEDIA share_media, Throwable throwable) {
    // resultCallback.invoke("分享失败：" + throwable.getMessage());
    // }
    //
    // @Override
    // public void onCancel(SHARE_MEDIA share_media) {
    // resultCallback.invoke("取消分享");
    // }
    // })
    // .share();
    // }
    // });
    // }
  }

  /**
   * 分享drawable图片
   */
  // @ReactMethod
  // public void shareImage(final int platform, final Callback resultCallback) {

  // final SHARE_MEDIA sharePlatform = getSharePlatform(platform);
  // if(UMShareAPI.get(mActivity).isInstall(mActivity, sharePlatform)) {
  // final UMImage image = new UMImage(mActivity,
  // R.drawable.ic_socialshare_qrcode);
  // runOnMainThread(new Runnable() {
  // @Override
  // public void run() {
  // new ShareAction(mActivity)
  // .setPlatform(sharePlatform)
  // .withMedia(image)
  // .setCallback(new UMShareListener() {
  // @Override
  // public void onStart(SHARE_MEDIA share_media) {
  // //分享开始的回调
  // }

  // @Override
  // public void onResult(SHARE_MEDIA share_media) {
  // resultCallback.invoke("分享成功");
  // }

  // @Override
  // public void onError(SHARE_MEDIA share_media, Throwable throwable) {
  // resultCallback.invoke("分享失败：" + throwable.getMessage());
  // }

  // @Override
  // public void onCancel(SHARE_MEDIA share_media) {
  // resultCallback.invoke("取消分享");
  // }
  // })
  // .share();
  // }
  // });
  // }
  // }

  /**
   * 分享链接
   *
   * @param title
   * @param description
   * @param contentUrl
   * @param imgUrl
   * @param platform
   * @param resultCallback
   */
  @ReactMethod
  public void share(String title, String description, String contentUrl, String imgUrl, final int platform,
      final Callback resultCallback) {
    // final SHARE_MEDIA sharePlatform = getSharePlatform(platform);
    // if(UMShareAPI.get(mActivity).isInstall(mActivity, sharePlatform)) {
    // final UMWeb web = new UMWeb(contentUrl);
    // web.setTitle(title); //标题
    // web.setThumb(new UMImage(context, imgUrl)); //缩略图
    // web.setDescription(description); //描述
    // runOnMainThread(new Runnable() {
    // @Override
    // public void run() {
    // new ShareAction(mActivity)
    // .setPlatform(sharePlatform)
    // .withMedia(web) // 分享链接
    // .setCallback(new UMShareListener() {
    // @Override
    // public void onStart(SHARE_MEDIA share_media) {
    // //分享开始的回调
    // }
    //
    // @Override
    // public void onResult(SHARE_MEDIA share_media) {
    // resultCallback.invoke("分享成功");
    // }
    //
    // @Override
    // public void onError(SHARE_MEDIA share_media, Throwable throwable) {
    // resultCallback.invoke("分享失败：" + throwable.getMessage());
    // }
    //
    // @Override
    // public void onCancel(SHARE_MEDIA share_media) {
    // resultCallback.invoke("取消分享");
    // }
    // })
    // .share();
    // }
    // });
    // } else {
    // resultCallback.invoke("未安装该软件");
    // }
  }

  /**
   * 分享或登录处理后的回调
   *
   * @param activity
   * @param requestCode
   * @param resultCode
   * @param data
   */
  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    // UMShareAPI.get(mActivity).onActivityResult(requestCode, resultCode, data);
  }

  @Override
  public void onNewIntent(Intent intent) {
  }

}
