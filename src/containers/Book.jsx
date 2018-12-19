import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import BackupIcon from '@material-ui/icons/Backup'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import CloseIcon from '@material-ui/icons/Close'
import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'
import differenceBy from 'lodash/differenceBy'

import Lookups from '../components/Lookups'

const styles = {
  appBar: {
    position: 'sticky'
  },
  flex: {
    flex: 1
  }
}

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false
    }
    const client = Stitch.defaultAppClient
    if (!client.auth.isLoggedIn) {
      const credential = new UserPasswordCredential(
        process.env.TEST_EMAIL,
        process.env.TEST_PASSWORD
      )
      client.auth.loginWithCredential(credential)
    }
    this.client = client
    this.upload = this.upload.bind(this)
  }

  async upload () {
    const { book } = this.props
    const lookupIds = await this.client.callFunction('lookupIds', [book._id])
    if (lookupIds) {
      const lookups = differenceBy(book.lookups, lookupIds, '_id')
      if (lookups.length) {
        this.client
          .callFunction('addLookups', [book._id, lookups])
          .then(result => {
            console.log(result)
            this.setState({ done: true })
          })
      } else {
        this.setState({ done: true })
      }
    } else {
      this.client.callFunction('createBook', [book]).then(result => {
        console.log(result)
        this.setState({ done: true })
      })
    }
  }

  render () {
    const { classes, book, close } = this.props
    const { done } = this.state
    return (
      <Dialog open fullScreen onClose={close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography
              variant='title'
              color='inherit'
              className={classes.flex}
            >
              {book.title}
            </Typography>
            <IconButton
              color='inherit'
              onClick={() => done || this.upload()}
              aria-label='Upload'
            >
              {done ? <CloudDoneIcon /> : <BackupIcon />}
            </IconButton>
            <IconButton color='inherit' onClick={close} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Lookups lookups={book.lookups} />
      </Dialog>
    )
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object
}

export default withStyles(styles)(Book)
