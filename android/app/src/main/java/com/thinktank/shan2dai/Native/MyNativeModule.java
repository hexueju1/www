package com.thinktank.shan2dai.Native;

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

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
        resultCallback.invoke(getInstalledApplication(this.context, false).size() + "size");
    }

    @ReactMethod
    public List<String> getSMS(final Callback resultCallback) {
        return getSMS(this.context);
    }

    @ReactMethod
    public void getPhoneLog(final Callback resultCallback) {
        getContentCallLog(this.context);
        resultCallback.invoke("size");
    }

    public static String[] columns = {CallLog.Calls.CACHED_NAME// 通话记录的联系人
            , CallLog.Calls.NUMBER// 通话记录的电话号码
            , CallLog.Calls.DATE// 通话记录的日期
            , CallLog.Calls.DURATION// 通话时长
            , CallLog.Calls.TYPE};// 通话类型

    //获取通话记录
    @SuppressLint({"SimpleDateFormat", "MissingPermission"})
    public static void getContentCallLog(Context context) {
        Cursor cursor = context.getContentResolver().query(CallLog.Calls.CONTENT_URI, // 查询通话记录的URI
                columns
                , null, null, CallLog.Calls.DEFAULT_SORT_ORDER// 按照时间逆序排列，最近打的最先显示
        );
        if (cursor != null) {
            Log.i("getContentCallLog", "cursor count:" + cursor.getCount());
        }
        while (cursor != null && cursor.moveToNext()) {
            String name = cursor.getString(cursor.getColumnIndex(CallLog.Calls.CACHED_NAME));  //姓名
            String number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER));  //号码
            long dateLong = cursor.getLong(cursor.getColumnIndex(CallLog.Calls.DATE)); //获取通话日期
            String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(dateLong));
            String time = new SimpleDateFormat("HH:mm").format(new Date(dateLong));
            int duration = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.DURATION));//获取通话时长，值为多少秒
            int type = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.TYPE)); //获取通话类型：1.呼入2.呼出3.未接
            String dayCurrent = new SimpleDateFormat("dd").format(new Date());
            String dayRecord = new SimpleDateFormat("dd").format(new Date(dateLong));

            Log.i("getContentCallLog", "Call log: " + "\n"
                    + "name: " + name + "\n"
                    + "phone number: " + number + "\n"

            );

        }
    }

    private static List<String> getSMS(Context context) {
        List<String> sms = new ArrayList<String>();
        Uri uriSMSURI = Uri.parse("content://sms/inbox");
        Cursor cur = context.getContentResolver().query(uriSMSURI, null, null, null, null);

        while (cur != null && cur.moveToNext()) {
            String address = cur.getString(cur.getColumnIndex("address"));
            String body = cur.getString(cur.getColumnIndexOrThrow("body"));
            sms.add("Number: $address .Message: $body");
        }

        if (cur != null) {
            cur.close();
        }
        return sms;
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
    private static List<ResolveInfo> getInstalledApplication(Context context, boolean needSysAPP) {
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
    private static boolean isSysApp(Context context, String packageName) throws PackageManager.NameNotFoundException {
        PackageInfo packageInfo = context.getPackageManager().getPackageInfo(packageName, 0);
        return (packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0;
    }
}
