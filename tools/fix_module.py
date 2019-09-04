import shutil
import re
import os
import sys

module_path = os.path.dirname(__file__) + "/"
sys.path.append(module_path + "../")


def do_fix():
  print("start do_fix" + os.getcwd())
  shutil.copy("ios/oneday/RNCWKWebView.m", "node_modules/react-native-webview/ios/RNCWKWebView.m")
  

if __name__ == '__main__':
  do_fix()

