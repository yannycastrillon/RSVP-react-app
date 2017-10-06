import React from 'react';
import PropTypes from 'prop-types'
import GuestName from './GuestName.js'

const Guest = props => {
  return (
    <li>
      <GuestName
        is_editing={props.is_editing}
        name={props.name}
        handleNameEdits={e => props.setName(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={props.is_confirmed}
          onChange={props.handleConfirmation}
        /> Confirmed
      </label>
      <button onClick={props.handleEditing}>{props.is_editing ? "Save" : "Edit"}</button>
      <button onClick={props.handleRemoving}>remove</button>
    </li>
  )
}

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  is_confirmed: PropTypes.bool.isRequired,
  is_editing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
}

export default Guest
