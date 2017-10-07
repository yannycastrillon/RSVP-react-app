import React from 'react';
import PropTypes from 'prop-types'

const GuestName = props => {
  if (props.is_editing) {
    return (
      <input
        type="text"
        value={props.name}
        onChange={props.handleNameEdits}
      />
    )
  }
  return (
    <span>
      { props.name }
    </span>
  )
}

GuestName.propTypes = {
  is_editing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
}

export default GuestName;
