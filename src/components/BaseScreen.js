/**
 *
 * @format
 * @flow
 */

import React from 'react';
import { color, size, layout } from '../common/MyStyle'

export default class BaseScreen extends React.Component {

  constructor(props) {
    super(props);
    // console.log("BaseScreen constructor" + JSON.stringify(this))
  }

  componentDidMount() {
    // console.log("BaseScreen componentDidMount" + JSON.stringify(this))
  }

  componentWillUnmount() {
    // console.log("BaseScreen componentWillUnmount" + JSON.stringify(this))
  }
}

