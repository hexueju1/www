package com.thinktank.shan2dai.Native;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.List;

public class MyNativeModule extends ReactContextBaseJavaModule {

    private Context context;
    private static Activity mActivity;
    private static Handler mHandler = new Handler(Looper.getMainLooper());

    public static void initActivity(Activity activity) {
        mActivity = activity;
    }

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    private static void runOnMainThread(Runnable task) {
        mHandler.post(task);
    }

    @Override
    public String getName() {
        return "mynativemodule";
    }

    @ReactMethod
    public void getOtherAppInfo(final Callback resultCallback) {
        resultCallback.invoke(getInstalledApplication(this.context, false).size() + "size");
    }


    public static List<ResolveInfo> getInstalledApplication(Context context, boolean needSysAPP) {
        PackageManager packageManager = context.getPackageManager();
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> resolveInfos = packageManager.queryIntentActivities(intent, 0);

        //排除系统应用
        if (!needSysAPP) {
            for (int i = 0; i < resolveInfos.size(); i++) {
                ResolveInfo resolveInfo = resolveInfos.get(i);
                String appName = resolveInfo.activityInfo.applicationInfo.loadLabel(context.getPackageManager()).toString();
                Log.e("resolveInfo", appName);
                try {
                    if (isSysApp(context, resolveInfo.activityInfo.packageName)) {
                        resolveInfos.remove(resolveInfo);
                    }
                } catch (PackageManager.NameNotFoundException e) {
                    e.printStackTrace();
                    resolveInfos.remove(resolveInfo);
                }
            }
        }
        return resolveInfos;
    }


    //判断是否系统应用
    public static boolean isSysApp(Context context, String packageName) throws PackageManager.NameNotFoundException {
        PackageInfo packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
        if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
            return false;
        } else {
            return true;
        }
    }
}
