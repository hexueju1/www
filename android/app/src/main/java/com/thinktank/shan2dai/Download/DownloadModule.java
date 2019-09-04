package com.thinktank.shan2dai.Download;


import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.Context;
import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class DownloadModule extends ReactContextBaseJavaModule {
    DownloadManager downManager;
    Activity myActivity;

    public DownloadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @Override
    public String getName() {
        return "Download";
    }

    @ReactMethod
    public void downloading(String url, String description) {

        fileIsExists();

        myActivity = getCurrentActivity();
        downManager = (DownloadManager) myActivity.getSystemService(Context.DOWNLOAD_SERVICE);
        Uri uri = Uri.parse(url);
        DownloadManager.Request request = new Request(uri);
        request.setAllowedNetworkTypes(Request.NETWORK_WIFI);

        //设置通知栏标题
        request.setNotificationVisibility(Request.VISIBILITY_VISIBLE);
        request.setMimeType("application/vnd.android.package-archive");
        request.setTitle(description);
        if (description == null || "".equals(description)) {
            description = "GlenBit.apk正在下载";
        }
        request.setDescription(description);
        request.setAllowedOverRoaming(false);

        //设置文件存放目录
        request.setDestinationInExternalFilesDir(myActivity, Environment.DIRECTORY_DOWNLOADS, "GlenBit.apk");
        long download = downManager.enqueue(request);
        SharedPreferences sPreferences = myActivity.getSharedPreferences("GlenBit", 0);
        sPreferences.edit().putLong("GlenBit_apk", download).commit();
    }

    private boolean fileIsExists() {
        try {
            File file = new File(getReactApplicationContext().getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) + "/GlenBit.apk");
            if (!file.exists()) {
                return false;
            } else {
                file.delete();
            }

        } catch (Exception e) {
            return false;
        }

        return true;
    }
}
