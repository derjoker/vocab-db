import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export default class Books extends Component {
  render () {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Harry Potter</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
