import ImagePicker from 'react-native-image-picker'
import { showToast } from './MyToastUtils'

/**
 *
 * 选择照片或拍照
 *
 *     maxWidth?: number;
    maxHeight?: number;
    quality?: number; 	0 to 1, photos only
 */

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 0.3,
  maxWidth: 1000,
  maxHeight: 1000,
}

function handleResult(resolve, reject, response) {
  // console.log('Response = ', response)
  if (response.didCancel) {
    console.log('User cancelled image picker')
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error)
    reject(response.error)
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton)
  } else {
    console.log('Responseuri = ', response.uri)
    const source = { uri: response.uri }
    resolve(source)
  }
}

/**
 * 拍照
 */
export function launchCamera() {
  return new Promise(function(resolve, reject) {
    ImagePicker.launchCamera(options, (response) => {
      for (let [key, value] of Object.entries(response)) {
        console.log(key + ':' + value)
      }
      handleResult(resolve, reject, response)
    })
  })
}

/**
 * 打开相册选择照片
 */
export function launchImageLibrary() {
  return new Promise(function(resolve, reject) {
    ImagePicker.launchImageLibrary(options, (response) => {
      handleResult(resolve, reject, response)
    })
  })
}

/**
 * 拍照或选择照片
 */
export function showImagePicker() {
  return new Promise(function(resolve, reject) {
    ImagePicker.showImagePicker(options, (response) => {
      handleResult(resolve, reject, response)
    })
  })
}

// 图片上传
export function uploadFileToOss(responseJson, targetUri, progressCallback, successCallback, tail = '_front.jpg') {
  let ossbase = responseJson.data.dir + 'authentication/idcard/' + responseJson.data.number + tail
  let urlPath = responseJson.data.host + '/' + ossbase
  console.log('target:' + urlPath)

  const uploadMediaData = new FormData()
  uploadMediaData.append('OSSAccessKeyId', responseJson.data.accessid)
  uploadMediaData.append('policy', responseJson.data.policy)
  uploadMediaData.append('Signature', responseJson.data.signature)
  uploadMediaData.append('key', ossbase)
  uploadMediaData.append('success_action_status', 200)
  uploadMediaData.append('file', {
    uri: targetUri,
    type: 'multipart/form-data',
    name: 'file',
  })

  //开始上传
  const OSS_UPLOAD_URI = responseJson.data.host
  doUpload(
    OSS_UPLOAD_URI,
    {
      method: 'POST',
      body: uploadMediaData,
      extra: null,
    },
    (progressEvent) => {
      const progress = progressEvent.loaded / progressEvent.total
      console.log('progress = ' + progress)
      progressCallback(progress)
    },
    (xhr) => {
      showToast('图片上传成功')
      successCallback(urlPath)
    },
    (xhr) => {
      showToast('图片上传成功')
    },
  ).then(
    (res) => {
      // console.log(res)
    },
    (err) => showToast('图片上传失败'),
  )
}

//这个方法就是具体上传的代码了
function doUpload(url, opts = {}, onProgress, successResponse, failResponse) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest()
    xhr.open(opts.method || 'get', url)
    for (let k in opts.headers || {}) {
      xhr.setRequestHeader(k, opts.headers[k])
    }
    xhr.onload = (e) => res(e)
    xhr.onreadystatechange = (e) => {
      console.log('onreadystatechange')
      if (xhr.readyState !== 4) {
        return
      }
      //阿里云的状态码200 才有返回的信息
      if (xhr.status === 200) {
        xhr.extra = opts.extra
        successResponse(xhr)
      } else {
        xhr.extra = opts.extra
        failResponse(xhr)
      }
    }
    xhr.onerror = rej
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress
    }
    xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.send(opts.body)
  })
}
