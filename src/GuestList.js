import React from 'react';
import PropTypes from 'prop-types'
const GuestList = props => {


  render: {
    return (
      <ul>
      {
        props.guests.map((guest, index) => (
          <li key={index} className="confirmed"><span>{guest.name}</span>
              <label>
                <input type="checkbox" checked={guest.isConfirmed} /> Confirmed
              </label>
              <button>edit</button>
              <button>remove</button>
            </li>
        ))
      }
      </ul>
    )
  }
}



// <li className="pending"><span>Safia</span></li>
// <li className="responded"><span>Iver</span>
//   <label>
//     <input type="checkbox" checked /> Confirmed
//   </label>
//   <button>edit</button>
//   <button>remove</button>
// </li>
// <li className="responded">
//   <span>Corrina</span>
//   <label>
//     <input type="checkbox" checked /> Confirmed
//   </label>
//   <button>edit</button>
//   <button>remove</button>
// </li>
// <li>
//   <span>Joel</span>
//   <label>
//     <input type="checkbox" /> Confirmed
//   </label>
//   <button>edit</button>
//   <button>remove</button>
// </li>

GuestList.propTypes = {
  guests: PropTypes.array.isRequired
}

export default GuestList
