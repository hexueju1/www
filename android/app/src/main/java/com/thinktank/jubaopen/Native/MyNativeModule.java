package com.thinktank.jubaopen.Native;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.CallLog;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.text.SimpleDateFormat;
import java.util.Date;
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
        resultCallback.invoke(getInstalledApplication(this.context, false));
    }

    @ReactMethod
    public void getSMS(final Callback resultCallback) {
        resultCallback.invoke(getSMS(this.context));
    }

    @ReactMethod
    public void getPhoneLog(final Callback resultCallback) {
        resultCallback.invoke(getContentCallLog(this.context));
    }

    public static String[] columns = {CallLog.Calls.CACHED_NAME// 通话记录的联系人
            , CallLog.Calls.NUMBER// 通话记录的电话号码
            , CallLog.Calls.DATE// 通话记录的日期
            , CallLog.Calls.DURATION// 通话时长
            , CallLog.Calls.TYPE};// 通话类型

    //获取通话记录
    @SuppressLint({"SimpleDateFormat", "MissingPermission"})
    public static WritableArray getContentCallLog(Context context) {
        WritableArray writableArray = Arguments.createArray();
        Cursor cursor = context.getContentResolver().query(CallLog.Calls.CONTENT_URI, // 查询通话记录的URI
                columns
                , null, null, CallLog.Calls.DEFAULT_SORT_ORDER// 按照时间逆序排列，最近打的最先显示
        );
        if (cursor != null) {
            Log.i("getContentCallLog", "cursor count:" + cursor.getCount());
        }
        while (cursor != null && cursor.moveToNext()) {
            WritableMap writableMap = Arguments.createMap();
            String name = cursor.getString(cursor.getColumnIndex(CallLog.Calls.CACHED_NAME));  //姓名
            String number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER));  //号码
            long dateLong = cursor.getLong(cursor.getColumnIndex(CallLog.Calls.DATE)); //获取通话日期
            String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(dateLong));
            String time = new SimpleDateFormat("HH:mm").format(new Date(dateLong));
            int duration = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.DURATION));//获取通话时长，值为多少秒
            int type = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.TYPE)); //获取通话类型：1.呼入2.呼出3.未接
            String dayCurrent = new SimpleDateFormat("dd").format(new Date());
            String dayRecord = new SimpleDateFormat("dd").format(new Date(dateLong));
            writableMap.putString("date", date);
            writableMap.putString("name", name);
            writableMap.putString("number", number);
            writableArray.pushMap(writableMap);
            Log.i("getContentCallLog", "Call log: " + "\n"
                    + "name: " + name + "\n"
                    + "phone number: " + number + "\n"

            );

        }
        return writableArray;
    }

    private static WritableArray getSMS(Context context) {
        WritableArray writableArray = Arguments.createArray();
        Uri uriSMSURI = Uri.parse("content://sms/inbox");
        Cursor cur = context.getContentResolver().query(uriSMSURI, null, null, null, null);

        while (cur != null && cur.moveToNext()) {
            WritableMap writableMap = Arguments.createMap();
            String address = cur.getString(cur.getColumnIndex("address"));
            String body = cur.getString(cur.getColumnIndexOrThrow("body"));
            writableMap.putString("address", address);
            writableMap.putString("body", body);
            writableArray.pushMap(writableMap);
        }

        if (cur != null) {
            cur.close();
        }
        return writableArray;
    }

    //    //包名
//    resolveInfo.activityInfo.packageName
//
////启动Activity
//    resolveInfo.activityInfo.name
//
////APP名
//resolveInfo.activityInfo.applicationInfo.loadLabel(getPackageManager())
//
////Icon
//            resolveInfo.activityInfo.applicationInfo.loadIcon(getPackageManager())
//
////APK安装包路径
//    resolveInfo.activityInfo.applicationInfo.sourceDir
    private static WritableArray getInstalledApplication(Context context, boolean needSysAPP) {
        WritableArray writableArray = Arguments.createArray();
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
        for (int i = 0; i < resolveInfos.size(); i++) {
            ResolveInfo resolveInfo = resolveInfos.get(i);
            String appName = resolveInfo.activityInfo.applicationInfo.loadLabel(context.getPackageManager()).toString();
            WritableMap writableMap = Arguments.createMap();
            writableMap.putString("appName", appName);
            writableMap.putString("packageName", resolveInfo.activityInfo.packageName);
            writableArray.pushMap(writableMap);
        }
        return writableArray;
    }


    //判断是否系统应用
    private static boolean isSysApp(Context context, String packageName) throws PackageManager.NameNotFoundException {
        PackageInfo packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
        return (packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0;
    }
}
