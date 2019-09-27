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

export function launchCamera() {
  return new Promise(function(resolve, reject) {
    ImagePicker.launchCamera(options, (response) => {
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
    })
  })
}
