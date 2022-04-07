import {
  HOSPITAL_GET_REQUEST,
  HOSPITAL_GET_SUCCESS,
  HOSPITAL_GET_FAIL,
  HOSPITAL_GET_RESET,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_GET_RESET,
  ROOM_BOOK_REQUEST,
  ROOM_BOOK_SUCCESS,
  ROOM_BOOK_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
} from '../constants/hospitalConstants';

export const getHospitalReducer = (state = {}, action) => {
  switch (action.type) {
    case HOSPITAL_GET_REQUEST:
      return { loading: true };
    case HOSPITAL_GET_SUCCESS:
      return { loading: false, success: true, hospital: action.payload };
    case HOSPITAL_GET_FAIL:
      return { loading: false, success: false, error: action.payload };
    case HOSPITAL_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const getBookingReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_GET_REQUEST:
      return { loading: true };
    case BOOKING_GET_SUCCESS:
      return { loading: false, success: true, bookings: action.payload };
    case BOOKING_GET_FAIL:
      return { loading: false, success: false, error: action.payload };
    case BOOKING_GET_RESET:
      return state;
    default:
      return state;
  }
};

export const createBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_BOOK_REQUEST:
      return { loading: true };
    case ROOM_BOOK_SUCCESS:
      return { loading: false, success: true, bookings: action.payload };
    case ROOM_BOOK_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const roomResetAndDeleteBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_DELETE_REQUEST:
      return { loading: true };
    case BOOKING_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case BOOKING_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
