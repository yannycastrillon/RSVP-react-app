import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Guest from './Guest'
import PendingGuest from './PendingGuest'

class GuestList extends Component {
  state = {
    is_disabled: false
  }

  toggleDisableEditButton() {
    this.setState({ is_disabled: !this.state.is_disabled })
  }
  // To be able to handle two functions on a callback
  handleEditingClick(guest) {
    this.toggleDisableEditButton()
    this.props.toggleEditingAt(guest.id)
  }

  render(){
    return (
      <ul>
        <PendingGuest name={this.props.pendingGuest} />
        {
          this.props.guests
            .filter(guest => !this.props.isFiltered || guest.is_confirmed)
            .map((guest, index) => (
            <Guest
              key={index}
              name={guest.name}
              is_confirmed={guest.is_confirmed}
              is_editing={guest.is_editing}
              is_disabled={guest.is_editing ? !this.state.is_disabled : this.state.is_disabled}
              handleConfirmation={() => this.props.toggleConfirmationAt(guest.id)}
              handleEditing={() => this.handleEditingClick(guest)  }
              handleRemoving={() => this.props.removeGuestAt(guest.id)}
              setName={(text) => this.props.setNameAt(text, guest.id)}
            />
          ))
        }
      </ul>
    )
  }
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
