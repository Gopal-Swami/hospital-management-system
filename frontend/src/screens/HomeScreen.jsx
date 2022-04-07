import React, { useState } from 'react';
import RoomAvailability from '../components/RoomAvailability';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getHospital } from '../actions/hospitalActions';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [patientName, setPatientName] = useState('');
  const checkAvailability = () => {
    dispatch(getHospital());
  };
  const hospitals = useSelector((state) => state.hospitals);
  const { loading, error, success, hospital } = hospitals;
  const handleChange = (e) => {
    e.preventDefault();
    setPatientName(e.target.value);
  };
  error && toast.error(error);

  return (
    <>
      <div className="home-container">
        <div className="patient-form">
          <label htmlFor="patientName" className="form-label">
            Patient Name
          </label>
          <input
            value={patientName}
            onChange={handleChange}
            type="text"
            className="patientName form-control"
            id="patientName"
          />

          {loading ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={checkAvailability}
              className="btn btn-dark mt-3"
            >
              Check Availability
            </button>
          )}
        </div>
        {success && hospital ? (
          <RoomAvailability patientName={patientName} />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default HomeScreen;
