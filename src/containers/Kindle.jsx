import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Books from '../components/Books'
import Book from './Book'

export default class Kindle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      books: [],
      bookKey: null,
      book: null
    }
    this.closeBookDialog = this.closeBookDialog.bind(this)
  }

  closeBookDialog () {
    this.setState({ book: null })
  }

  componentWillMount () {
    ipcRenderer.send('fetch-books')
  }

  componentDidMount () {
    ipcRenderer.on('books', (_, books) => {
      this.setState({ books })
    })

    ipcRenderer.on('lookups', (_, lookups) => {
      const { books, bookKey } = this.state
      const book = books.find(book => book._id === bookKey)
      book.lookups = lookups
      this.setState({ book })
    })
  }

  render () {
    const { title, books, book } = this.state
    const regex = new RegExp(title, 'i')
    const filtered = title
      ? books.filter(book => regex.test(book.title))
      : books
    return (
      <div>
        {book && <Book book={book} close={this.closeBookDialog} />}
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
            <Books
              books={filtered}
              clickTableRow={bookKey => {
                this.setState({ bookKey })
                ipcRenderer.send('fetch-lookups', bookKey)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button>Import / Upload / Sync</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}
