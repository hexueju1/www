'use strict';
/**
 *
 * @format
 * @flow
 */

import { LOG } from '../utils/MyDebugUtils'

class StackManager {

  lastChangeTime = new Date().getTime()

  needUpdate = () => {
    let current = new Date().getTime()
    let diff = current - this.lastChangeTime
    console.log("current - lastChangeTime:" + diff)
    this.update()
    return diff > 300
  }

  update = () => {
    this.lastChangeTime = new Date().getTime()
  }

  constructor() {
    LOG('StackManager constructor')
  }

}

export default (new StackManager)