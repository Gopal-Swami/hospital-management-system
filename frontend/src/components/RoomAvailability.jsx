import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {
  createBooking,
  getBookings,
  getHospital,
} from '../actions/hospitalActions';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const RoomAvailability = ({ patientName }) => {
  const dispatch = useDispatch();
  const hospitals = useSelector((state) => state.hospitals);
  const { loading, hospital } = hospitals;
  const createdBooking = useSelector((state) => state.createdBooking);
  const { error, success } = createdBooking;
  const bookRoom = (e, roomType) => {
    let patientId = uuidv4();
    if (patientName !== '') {
      dispatch(createBooking(patientId, patientName, roomType));
      setTimeout(() => {
        success && toast.success('Booking Confirmed');
        error && toast.error(error);
        dispatch(getBookings());
        dispatch(getHospital());
      }, 500);
    } else {
      toast.error('Please Provide Patient Name');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room Type</th>
              <th scope="col">Facility</th>
              <th scope="col">Available</th>
              <th scope="col">Booked</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Normal Room</td>
              <td>
                1 Flat Bed <br />2 Normal Masks
              </td>
              <td>
                {hospital && hospital.normal_rooms.available === 0
                  ? 'NA'
                  : hospital.normal_rooms.available}
              </td>
              <td>{hospital && hospital.normal_rooms.booked}</td>
              <td>
                {hospital && hospital.normal_rooms.available === 0 ? (
                  'Sorry, no rooms could be reserved.'
                ) : (
                  <button
                    type="button"
                    onClick={(e) => bookRoom(e, 'normal_rooms')}
                    className="btn btn-dark"
                  >
                    Book
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Oxygen Room</td>
              <td>
                2 Oxygen Cylinders <br /> 1 Recliner Bed <br /> 2 Non Rebreather
                Masks
              </td>
              <td>
                {hospital && hospital.oxygen_rooms.available === 0
                  ? 'NA'
                  : hospital.oxygen_rooms.available}
              </td>
              <td>{hospital && hospital.oxygen_rooms.booked}</td>
              <td>
                {hospital && hospital.oxygen_rooms.available === 0 ? (
                  'Sorry, no rooms could be reserved.'
                ) : (
                  <button
                    type="button"
                    onClick={(e) => bookRoom(e, 'oxygen_rooms')}
                    className="btn btn-dark"
                  >
                    Book
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ICU Room</td>
              <td>
                1 Ventilator <br /> 1 Recliner Bed <br /> 1 Oxygen Cylinder
              </td>
              <td>
                {hospital && hospital.icu_rooms.available === 0
                  ? 'NA'
                  : hospital.icu_rooms.available}
              </td>
              <td>{hospital && hospital.icu_rooms.booked}</td>
              <td>
                {hospital && hospital.icu_rooms.available === 0 ? (
                  'Sorry, no rooms could be reserved.'
                ) : (
                  <button
                    type="button"
                    onClick={(e) => bookRoom(e, 'icu_rooms')}
                    className="btn btn-dark"
                  >
                    Book
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default RoomAvailability;
