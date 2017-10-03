import React from 'react'
import PropTypes from 'prop-types'

const GuestInputForm = (props) => {
  return(
    <form onSubmit={props.handleAddGuest}>
      <input
        type="text"
        value={props.pendingGuest}
        placeholder="Invite Someone"
        onChange={props.handlePendingGuest}
      />
      <button
        type="submit"
        name="submit"
        value="submit">Submit
      </button>
    </form>
  )
}

GuestInputForm.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handlePendingGuest: PropTypes.func.isRequired,
  handleAddGuest: PropTypes.func.isRequired
}

export default GuestInputForm;
