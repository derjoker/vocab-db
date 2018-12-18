import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Books extends Component {
  render () {
    const { books, clickTableRow } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Authors</TableCell>
            <TableCell>Lang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow
              key={book._id}
              onClick={() => {
                clickTableRow(book._id)
              }}
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.authors}</TableCell>
              <TableCell>{book.lang}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  clickTableRow: PropTypes.func
}

Books.defaultProps = {
  books: [],
  clickTableRow: bookKey => {
    console.log(bookKey)
  }
}

export default Books
