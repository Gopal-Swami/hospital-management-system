import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import {
  resetRoomsAndBookings,
  getBookings,
  getHospital,
} from '../actions/hospitalActions';
const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetRoomAndBooking = () => {
    if (window.confirm('Are you sure to reset rooms and bookings ? ')) {
      dispatch(resetRoomsAndBookings());
      setTimeout(() => {
        toast.success('Room And Booking Reset Completed');
        dispatch(getHospital());
        dispatch(getBookings());
      }, 1000);
    }
  };
  const resetRoomsAndBooking = useSelector(
    (state) => state.resetRoomsAndBookings
  );
  const {
    loading: resetLoading,
    error: resetError,
    success,
  } = resetRoomsAndBooking;
  const roomBookings = useSelector((state) => state.bookings);
  const { loading, error, bookings } = roomBookings;
  error && toast.error(error);
  resetError && toast.error(resetError);

  return (
    <>
      <div className="booking-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Room Type</th>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {booking.room_type === 'normal_rooms'
                        ? 'Normal Room'
                        : booking.room_type === 'oxygen_rooms'
                        ? 'Oxygen Room'
                        : booking.room_type === 'icu_rooms'
                        ? 'ICU Room'
                        : 'NA'}
                    </td>

                    <td>{booking.patient_name}</td>
                    <td>{booking.createdAt.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="booking-actions">
              <button
                type="button"
                onClick={resetRoomAndBooking}
                class="btn btn-danger m-2"
              >
                Delete All Bookings And Reset Room Availability
              </button>
              <button
                onClick={(e) => navigate('/')}
                type="button"
                class="btn btn-dark m-2"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
      )
    </>
  );
};

export default Bookings;
