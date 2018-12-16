import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Books from './Books'

export default class Kindle extends Component {
  render () {
    return (
      <Grid container>
        <Grid item xs={12}>
          <TextField fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Books />
        </Grid>
        <Grid item xs={12}>
          <Button>Import / Upload / Sync</Button>
        </Grid>
      </Grid>
    )
  }
}
