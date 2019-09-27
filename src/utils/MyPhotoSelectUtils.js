import ImagePicker from 'react-native-image-picker'

/**
 *
 * 选择照片或拍照
 *
 */

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

function handleResult(resolve, reject, response) {
  console.log('Response = ', response)
  if (response.didCancel) {
    console.log('User cancelled image picker')
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error)
    reject(response.error)
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton)
  } else {
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
