import React from 'react'
import { Stitch } from 'mongodb-stitch-browser-sdk'

import Kindle from './containers/Kindle'

require('dotenv').config()

try {
  Stitch.initializeDefaultAppClient(process.env.STITCH_APP_KEY)
} catch (error) {
  // ignore: default app can only be set once
}

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Kindle />
      </div>
    )
  }
}
