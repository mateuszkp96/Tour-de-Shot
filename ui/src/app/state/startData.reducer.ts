import * as fromRoot from '../state/App.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState extends fromRoot.AppState {
  startData: StartDataState
}

export interface StartDataState {
  //startPoint: google.maps.LatLng; //errors while parsing
  startPointLat: number
  startPointLon: number
  //startPlace: google.maps.places.PlaceResult;
  startPlaceFormattedAddress: string
  radius: number;
  pageNumber: number;
}

const initialStartDataState: StartDataState ={
  //startPoint: google.maps.LatLng; //errors while parsing
  startPointLat: null,
  startPointLon: null,
  //startPlace: google.maps.places.PlaceResult;
  startPlaceFormattedAddress: "",
  radius: null,
  pageNumber: null,
}

// Selector functions
const getStartDataFeatureState = createFeatureSelector<StartDataState>('startData');

export const getStartPointLat = createSelector(
  getStartDataFeatureState,
  state => state.startPointLat
);

export const getStartPointLon = createSelector(
  getStartDataFeatureState,
  state => state.startPointLon
);

export const getStartPlaceFormattedAddress = createSelector(
  getStartDataFeatureState,
  state => state.startPlaceFormattedAddress
);
export const getRadius = createSelector(
  getStartDataFeatureState,
  state => state.radius
);
export const getPageNumber = createSelector(
  getStartDataFeatureState,
  state => state.pageNumber
);




export function reducer(state=initialStartDataState, action): StartDataState {
  switch (action.type) {

    case 'START_PLACE_SELECTED' :
      console.log("Existing stare" + JSON.stringify(state))
      console.log("Payload" + JSON.stringify(action.payload))

      return {
        ...state,
        startPlaceFormattedAddress: action.payload
      };
    default:
      return state
  }

}
