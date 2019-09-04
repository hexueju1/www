package com.thinktank.shan2dai.NativeUI.MyNativeWebView;

import android.net.http.SslError;
import android.os.Handler;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.reactnativecommunity.webview.events.TopMessageEvent;

import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

@ReactModule(name = MyNativeWebViewManager.REACT_CLASS)
public class MyNativeWebViewManager extends SimpleViewManager<MyNativeWebView> {

    public static final String REACT_CLASS = "MyNativeWebView";
    MyNativeWebView webView;
    private String sourceTail = "index.html";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected MyNativeWebView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        webView = new MyNativeWebView(reactContext);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                super.onReceivedSslError(view, handler, error);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("https://www.tradingview.com")) {
                    return true;
                }
                return super.shouldOverrideUrlLoading(view, url);
            }
        });
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
//        webView.loadUrl("https://www.google.com");
//        特殊处理一下
        Log.d(REACT_CLASS, "new Handler");
//        new Handler().postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                Log.d(REACT_CLASS, "loadurl");
//                String chartingLibraryUrl = "file:///android_asset/" + sourceTail;
//                webView.loadUrl(chartingLibraryUrl);
//            }
//        }, 1000);
        webView.addJavascriptInterface(createRNCWebViewBridge(this), "ReactNativeWebView");
        return webView;
    }

    @ReactProp(name = "source")
    public void setSource(WebView view, @Nullable String source) {
        Log.d(REACT_CLASS, "setSource" + source);
        this.sourceTail = source;
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.d(REACT_CLASS, "loadurl");
                String chartingLibraryUrl = "file:///android_asset/" + sourceTail;
                webView.loadUrl(chartingLibraryUrl);
            }
        }, 1000);
    }

    @Override
    public @Nullable
    Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "injectJavaScript", 1,
                "reload", 2
        );
    }

    @Override
    public void receiveCommand(MyNativeWebView root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case 1:
                root.evaluateJavascript(args.getString(0), new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
//                        System.out.println("onReceiveValue");
                    }
                });
                break;
            case 2:
                root.reload();
                break;
        }
    }


    protected RNCWebViewBridge createRNCWebViewBridge(MyNativeWebViewManager webView) {
        return new RNCWebViewBridge(webView);
    }

    protected class RNCWebViewBridge {
        MyNativeWebViewManager mContext;

        RNCWebViewBridge(MyNativeWebViewManager c) {
            mContext = c;
        }

        /**
         * This method is called whenever JavaScript running within the web view calls:
         * - window[JAVASCRIPT_INTERFACE].postMessage
         */
        @JavascriptInterface
        public void postMessage(String message) {
            mContext.onMessage(message);
        }
    }

    public void onMessage(String message) {
        dispatchEvent(webView, new TopMessageEvent(webView.getId(), message));
    }

    protected static void dispatchEvent(WebView webView, Event event) {
        ReactContext reactContext = (ReactContext) webView.getContext();
        EventDispatcher eventDispatcher =
                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        eventDispatcher.dispatchEvent(event);
    }

}
