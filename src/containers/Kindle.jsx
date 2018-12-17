import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Books from '../components/Books'

export default class Kindle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      books: []
    }
  }

  componentWillMount () {
    ipcRenderer.send('fetch-books')
  }

  componentDidMount () {
    ipcRenderer.on('books', (_, books) => {
      this.setState({ books })
    })
  }

  render () {
    const { title, books } = this.state
    const regex = new RegExp(title, 'i')
    const filtered = title
      ? books.filter(book => regex.test(book.title))
      : books
    return (
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder='Title'
            value={title}
            onChange={event => {
              const title = event.target.value
              this.setState({ title })
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Books books={filtered} />
        </Grid>
        <Grid item xs={12}>
          <Button>Import / Upload / Sync</Button>
        </Grid>
      </Grid>
    )
  }
}
