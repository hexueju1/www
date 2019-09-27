package com.thinktank.shan2dai;

import android.app.Application;
import android.content.Context;
import android.os.StrictMode;

import androidx.multidex.MultiDex;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.mob.MobSDK;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.rnfs.RNFSPackage;
import com.rnlib.geetestsensebot.RNLGeetestSensebotPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.thinktank.shan2dai.Download.DownloadPackage;
import com.thinktank.shan2dai.Native.MyNativePackage;
import com.thinktank.shan2dai.NativeUI.BulbSample.BulbPackage;
import com.thinktank.shan2dai.Share.SharePackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return UpdateContext.getBundleUrl(MainApplication.this);
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new LinearGradientPackage(),
                    new NetInfoPackage(),
                    new ReactNativeContacts(),
                    new SplashScreenReactPackage(),
                    new RNFSPackage(),
                    new RNI18nPackage(),
                    new RNDeviceInfo(),
                    new CameraRollPackage(),
                    new RNViewShotPackage(),
                    new SvgPackage(),
                    new RNLGeetestSensebotPackage(),
                    new RNCWebViewPackage(),
                    new AsyncStoragePackage(),
                    new UpdatePackage(),
                    new RNGestureHandlerPackage(),
                    new BulbPackage(),
                    new SharePackage(),
                    new MyNativePackage(),
                    new DownloadPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        MobSDK.init(this);
        //apk下载更新
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure();
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

}
