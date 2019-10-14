package com.thinktank.jubaopen.NativeUI.BulbSample;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class BulbManager extends SimpleViewManager<BulbView> {

    @Override
    public String getName() {
        return "Bulb";
    }

    @Override
    protected BulbView createViewInstance(ThemedReactContext reactContext) {

        return new BulbView(reactContext);

    }
}