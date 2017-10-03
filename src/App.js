import React, { Component } from 'react';
import GuestList from './GuestList.js'
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
    let cloneGuests = Object.assign([], this.state.guests)
    this.setState({
      guests: [
        ...this.state.guests.slice(0, indexToRemove),
        ...this.state.guests.slice(indexToRemove + 1)
      ]

    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.handleAddGuest}>
              <input
                type="text"
                value={this.state.pendingGuest}
                placeholder="Invite Someone"
                onChange={(e) => this.handlePendingGuest(e.target.value)}
              />
              <button
                type="submit"
                name="submit"
                value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              /> Hide those who haven' /t responded
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <GuestList
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            removeGuestAt={this.removeGuestAt}
            isFiltered={this.state.isFiltered}
          />
        </div>
      </div>
    );
  }
}

export default App;
