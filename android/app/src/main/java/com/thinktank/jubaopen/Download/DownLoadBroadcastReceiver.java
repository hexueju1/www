package com.thinktank.jubaopen.Download;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;

import java.io.File;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

//
        long myDownloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sPreferences = context.getSharedPreferences("GlenBit", 0);
        long refernece = sPreferences.getLong("GlenBit_apk", 0);


        if (refernece == myDownloadId) {
            DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
//            Intent install = new Intent(Intent.ACTION_VIEW);
//            Uri downloadFileUri = dManager.getUriForDownloadedFile(myDwonloadID);
            DownloadManager.Query querybyId = new DownloadManager.Query();
            querybyId.setFilterById(myDownloadId);
            Cursor myDownload = dManager.query(querybyId);
            String downloadName = null;
            if (myDownload.moveToFirst()) {
                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));

                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    // process download
//                    int fileNameIdx = myDownload.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);

                    //此处取得的是完整路径+文件名称
//                    downloadName = myDownload.getString(fileNameIdx);
                    downloadName = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) + "/GlenBit.apk";

                } else {
//                    Toast.makeText(context, "下载失败，删除残留文件", Toast.LENGTH_LONG).show();
                    dManager.remove(myDownloadId);
                    myDownload.close();

                    return;
                }
                myDownload.close();

            }
            if (downloadName == null) {

                return;
            }


            File file = new File(downloadName);

            Intent installIntent = new Intent();
            installIntent.setAction(Intent.ACTION_VIEW);
            // 在Boradcast中启动活动需要添加Intent.FLAG_ACTIVITY_NEW_TASK
            installIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            installIntent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");//存储位置为Android/data/包名/file/Download文件夹
            context.startActivity(installIntent);


        }
    }
}