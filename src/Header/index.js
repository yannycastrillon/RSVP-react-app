import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from './GuestInputForm'

const Header = (props) => {
  return(
    <header>
      <h1>RSVP</h1>
      <p>My RSVP App</p>
      <GuestInputForm
        pendingGuest={props.pendingGuest}
        handlePendingGuest={(e) => props.handlePendingGuest(e.target.value)}
        handleAddGuest={props.handleAddGuest}
      />
    </header>
  )
}

Header.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handlePendingGuest: PropTypes.func.isRequired,
  handleAddGuest: PropTypes.func.isRequired
}

export default Header;
