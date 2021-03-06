import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getHospitalReducer,
  getBookingReducer,
  createBookingReducer,
  roomResetAndDeleteBookingReducer,
} from './reducers/hospitalReducers';

const reducer = combineReducers({
  hospitals: getHospitalReducer,
  bookings: getBookingReducer,
  createdBooking: createBookingReducer,
  resetRoomsAndBookings: roomResetAndDeleteBookingReducer,
});

const intialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
