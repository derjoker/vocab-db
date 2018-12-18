import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Usages extends Component {
  render () {
    const { usages } = this.props
    return (
      <Table>
        <TableBody>
          {usages.map(usage => (
            <TableRow key={usage.usage}>
              <TableCell>{usage.usage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

Usages.propTypes = {
  usages: PropTypes.array.isRequired
}

Usages.defaultProps = {
  usages: []
}

export default Usages
