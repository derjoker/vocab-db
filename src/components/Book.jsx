import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'

import Usages from './Usages'

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
  render () {
    const { classes, book, close } = this.props
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
            <IconButton color='inherit' onClick={close} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Usages usages={book.usages} />
      </Dialog>
    )
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object
}

export default withStyles(styles)(Book)
