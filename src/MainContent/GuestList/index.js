import React from 'react';
import PropTypes from 'prop-types'
import Guest from './Guest'
import PendingGuest from './PendingGuest'

const GuestList = props => {
  return (
    <ul>
      <PendingGuest name={props.pendingGuest}/>
      {
        props.guests
          .filter(guest => !props.isFiltered || guest.is_confirmed)
          .map((guest, index) => (
          <Guest
            key={index}
            name={guest.name}
            is_confirmed={guest.is_confirmed}
            is_editing={guest.is_editing}
            handleConfirmation={() => props.toggleConfirmationAt(guest.id)}
            handleEditing={(event) => props.toggleEditingAt(guest.id)}
            handleRemoving={() => props.removeGuestAt(guest.id)}
            setName={(text) => props.setNameAt(text, guest.id)}
          />
        ))
      }
    </ul>
  )
}

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired,
  isFiltered: PropTypes.bool.isRequired
}

export default GuestList