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
        name: "Treasure",
        isConfirmed: false,
        isEditing: false
      },
      {
        name: "Nick",
        isConfirmed: true,
        isEditing: false
      },
      {
        name: "Yanny",
        isConfirmed: true,
        isEditing: false
      }
    ]
  };

  // General function to toggle any property from state.
  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index)=> {
        if (index === indexToChange){
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
  toggleConfirmationAt = index => {
    this.toggleGuestPropertyAt("isConfirmed",index);
  }

  // Toggles over the editing property.
  toggleEditingAt = index => {
    this.toggleGuestPropertyAt("isEditing",index);
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
  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
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
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing:false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }

  removeGuestAt = (indexToRemove) => {
    // guests: this.state.guests.filter((v,i) => { return i !== indexToRemove})
    this.setState({
      guests: [
        ...this.state.guests.slice(0, indexToRemove),
        ...this.state.guests.slice(indexToRemove + 1)
      ]

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
