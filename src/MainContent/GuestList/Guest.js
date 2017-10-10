import React, { Component } from 'react';
import PropTypes from 'prop-types'
import GuestName from './GuestName'

class Guest extends Component {

  render() {
    return (
      <li>
        <GuestName
          is_editing={this.props.is_editing}
          name={this.props.name}
          handleNameEdits={e => this.props.setName(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={this.props.is_confirmed}
            onChange={this.props.handleConfirmation}
          /> Confirmed
        </label>
        <button onClick={this.props.handleEditing} disabled={this.props.is_disabled}>{this.props.is_editing ? "Save" : "Edit"}</button>
        <button onClick={this.props.handleRemoving}>remove</button>
      </li>
    )
  }
}

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  is_confirmed: PropTypes.bool.isRequired,
  is_editing: PropTypes.bool.isRequired,
  is_disabled: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
}

export default Guest
