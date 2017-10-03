import React, { Component } from 'react';
import Header from './Header'
import MainContent from './MainContent'
import './App.css';

class App extends Component {
  state = {
    pendingGuest: "",
    isFiltered: false,
    guests: [
      {
        id: 1,
        name: "Treasure",
        isConfirmed: false,
        isEditing: false
      },
      {
        id: 2,
        name: "Nick",
        isConfirmed: true,
        isEditing: false
      },
      {
        id: 3,
        name: "Yanny",
        isConfirmed: true,
        isEditing: false
      }
    ]
  };

  lastGuestId = 0

  newGuestId = () => {
    const id = this.lastGuestId
    this.lastGuestId += 1
    return id
  }
  // General function to toggle any property from state.
  toggleGuestPropertyAt = (property, id) => {
    this.setState({
      guests: this.state.guests.map((guest)=> {
        if (guest.id === id){
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest
      })
    })
  }

  // Toggles over the confirmation property
  toggleConfirmationAt = id => {
    this.toggleGuestPropertyAt("isConfirmed",id);
  }

  // Toggles over the editing property.
  toggleEditingAt = id => {
    this.toggleGuestPropertyAt("isEditing",id);
  }

  toggleFilter = () => {
    this.setState({
      isFiltered: !this.state.isFiltered
    })
  }

  getTotalInvited = () => this.state.guests.length

  getAttendingGuests = () =>
    this.state.guests.reduce((total, guest) => {
      return guest.isConfirmed ? total + 1 : total
    }, 0)

  // Sets the current name when editing.
  setNameAt = (name, id) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (guest.id === id) {
          return {
            ...guest,
            name
          }
        }
        return guest
      })
    })
  }

  handlePendingGuest = (guestName) => {
    this.setState({
      pendingGuest: guestName
    })
  }

  handleAddGuest = (e) => {
    e.preventDefault();
    const id = this.newGuestId()
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing:false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }

  removeGuestAt = (id) => {
    // [
    //   ...this.state.guests.slice(0, indexToRemove),
    //   ...this.state.guests.slice(indexToRemove + 1)
    // ]
    this.setState({
      guests: this.state.guests.filter((guest) => { return guest.id !== id})

    })
  }

  render() {
    const totalInvited = this.getTotalInvited()
    const numberAttending = this.getAttendingGuests()
    const numberUnconfirmed = totalInvited - numberAttending
    return (
      <div className="App">
        <Header
          pendingGuest={this.state.pendingGuest}
          handlePendingGuest={this.handlePendingGuest}
          handleAddGuest={this.handleAddGuest}
        />
        <MainContent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}

          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}

          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
        />

      </div>
    );
  }
}

export default App;
