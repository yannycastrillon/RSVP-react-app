import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api/v1/guests/'
const FactoryApi = {
  fetchAllGuests,
  createGuest,
  updateGuest,
  deleteGuest
}

function fetchAllGuests() {
  return new Promise ((resolve, reject) => {
    axios.get(API_BASE_URL)
      .then(res => {
        const apiGuests = res.data
        return resolve(apiGuests)
      })
      .catch( error => reject(error))
  })
}

function createGuest(guest) {
  return new Promise((resolve, reject) => {
    axios.post(API_BASE_URL, bodyPayload(guest)).then(res => {
      const newGuest = res.data
      console.log(newGuest);
      resolve(newGuest)
    })
    .catch(err => reject(err))
  })
}

function updateGuest(guest) {
  return new Promise((resolve, reject) => {
    axios.patch(API_BASE_URL+guest.id, bodyPayload(guest))
      .then(res => {
        const updatedGuest = res.data
        resolve(updatedGuest)
      })
      .catch( error => reject(error))
  })
}

function deleteGuest(id) {
  return new Promise((resolve, reject) => {
    axios.delete(API_BASE_URL+id).then(res => {
      let deleteGuest = res.data
      resolve(deleteGuest)
    })
    .catch( err => reject(err))
  })
}

// The body object 'payload'. // Wrap on a guest object for rails api.
function bodyPayload(guest) {
  return {
    guest: { name: guest.name, is_confirmed: guest.is_confirmed, is_editing: guest.is_editing }
  }
}

export default FactoryApi;
