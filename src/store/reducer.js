import {
  AddBooking,
  UpdateRouteDistance,
  UpdateLocation,
  StartTrip,
  UpdateStation,
  UpdateDistance,
  EndTrip,
  ResetTrip
} from "./actions";

import tripInformation from "../lib/tripInformation"

export const initialState = JSON.parse(localStorage.getItem('root')) ||{
  ...tripInformation
};



export function reducer(state, action) {
  switch (action.type) {
    case "NEW_BOOKING":
      return AddBooking(state, action.payload);
    case "UPDATE_DISTANCE":
      return UpdateRouteDistance(state, action.payload);
    case "UPDATE_LOCATION":
      return UpdateLocation(state, action.payload);
    case "START_TRIP":
      return StartTrip(state, action.payload);
    case "UPDATE_STATION":
      return UpdateStation(state, action.payload);
    case "UPDATE_FULL_DISTANCE":
      return UpdateDistance(state, action.payload);
    case "END_TRIP":
      return EndTrip(state, action.payload);
    case "RESET_TRIP":
      return ResetTrip(state);
    default:
      return state;
  }
}