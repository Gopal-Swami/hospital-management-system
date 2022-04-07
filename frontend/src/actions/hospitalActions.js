import {
  HOSPITAL_GET_REQUEST,
  HOSPITAL_GET_SUCCESS,
  HOSPITAL_GET_FAIL,
  ROOM_BOOK_REQUEST,
  ROOM_BOOK_SUCCESS,
  ROOM_BOOK_FAIL,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
} from '../constants/hospitalConstants';
import axios from 'axios';

export const getHospital = () => async (dispatch) => {
  try {
    dispatch({
      type: HOSPITAL_GET_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': `application/json`,
      },
    };

    const { data } = await axios.get(`/api/hospital`, config);

    dispatch({
      type: HOSPITAL_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOSPITAL_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBooking =
  (patientId, patientName, roomType) => async (dispatch) => {
    try {
      dispatch({
        type: ROOM_BOOK_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': `application/json`,
        },
      };

      const { data } = await axios.put(
        `/api/hospital/booking`,
        { patientId, patientName, roomType },
        config
      );

      dispatch({
        type: ROOM_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ROOM_BOOK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getBookings = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_GET_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': `application/json`,
      },
    };

    const { data } = await axios.get(`/api/hospital/booking`, config);

    dispatch({
      type: BOOKING_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetRoomsAndBookings = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_DELETE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': `application/json`,
      },
    };

    await axios.put(`/api/hospital/resetrooms`, config);

    dispatch({
      type: BOOKING_DELETE_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
