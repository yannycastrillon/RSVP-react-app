import React, { Component } from 'react';
import Header from './Header'
import MainContent from './MainContent'
import './App.css';
import FactoryApi from './util/FactoryAPI'

class App extends Component {
  state = {
    pendingGuest: "",
    isFiltered: false,
    guests: []
  };

  componentDidMount = () => {
    FactoryApi.fetchAllGuests().then(apiGuests => {
      this.setState({ guests: apiGuests })
    })
  }

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
        if (guest.is_editing) {
          FactoryApi.updateGuest(guest).then(updatedGuest => console.log(updatedGuest))
        }
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
    this.toggleGuestPropertyAt("is_confirmed",id);
  }

  // Toggles over the editing property.
  toggleEditingAt = id => {
    this.toggleGuestPropertyAt("is_editing",id);
  }

  toggleFilter = () => {
    this.setState({
      isFiltered: !this.state.isFiltered
    })
  }

  getTotalInvited = () => this.state.guests.length

  getAttendingGuests = () =>
    this.state.guests.reduce((total, guest) => {
      return guest.is_confirmed ? total + 1 : total
    }, 0)

  // Sets the current name when editing.
  setNameAt = (name, id) => {
    this.setState({
      guests: this.state.guests.map((guest) => {
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
    this.setState({ pendingGuest: guestName })
  }

  handleAddGuest = (e) => {
    e.preventDefault();
    let guest = { name: this.state.pendingGuest, is_confirmed: false, is_editing: false }
    FactoryApi.createGuest(guest).then( newGuest => {
      this.setState({
        guests: [
          {
            name: newGuest.name,
            is_confirmed: newGuest.is_confirmed,
            is_editing: newGuest.is_editing,
          },
          ...this.state.guests
        ],
        pendingGuest: ""
      })
    })
  }

  removeGuestAt = (id) => {
    FactoryApi.deleteGuest(id)
      .then(deleteGuest => {
        console.log("------------ DELETE RESPONSE ------------");
        console.log(deleteGuest);
        console.log("------------ ------------ ------------ ");

        this.setState({
          guests: this.state.guests.filter((guest) => { return guest.id !== deleteGuest.guestId })

        })
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
