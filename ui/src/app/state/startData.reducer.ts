import * as fromRoot from '../state/App.state'
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StartDataActions, StartDataActionTypes} from './startData.actions';

export interface AppState extends fromRoot.AppState {
  startData: StartDataState
}

export class StartPointState {
  startPointLat: number
  startPointLon: number
}

export class StartDataState {
  //startPoint: google.maps.LatLng; //errors while parsing
  startPoint: StartPointState
  //startPlace: google.maps.places.PlaceResult;
  startPlaceFormattedAddress: string
  radius: number;
  pageNumber: number;
}

const initialStartPointState: StartPointState = {
  startPointLat: null,
  startPointLon: null
}
const initialStartDataState: StartDataState = {
  //startPoint: google.maps.LatLng; //errors while parsing
  startPoint: initialStartPointState,
  //startPlace: google.maps.places.PlaceResult;
  startPlaceFormattedAddress: "",
  radius: null,
  pageNumber: 1,
}

// Selector functions
const getStartDataFeatureState = createFeatureSelector<StartDataState>('startData');

export const getStartPointLat = createSelector(
  getStartDataFeatureState,
  state => state.startPoint.startPointLat
);

export const getStartPointLon = createSelector(
  getStartDataFeatureState,
  state => state.startPoint.startPointLon
);

export const getStartPoint = createSelector(
  getStartDataFeatureState,
  state => state.startPoint
);

export const getStartPlaceFormattedAddress = createSelector(
  getStartDataFeatureState,
  state => state.startPlaceFormattedAddress
);
export const getRadius = createSelector(
  getStartDataFeatureState,
  state => state.radius
);

export const getStartData = createSelector(
  getStartDataFeatureState,
  state => state
);

export function reducer(state = initialStartDataState, action: StartDataActions): StartDataState {

  switch (action.type) {
    case StartDataActionTypes.SelectStartPlace :
      console.log("Existing stare" + JSON.stringify(state))
      console.log("Payload" + JSON.stringify(action.payload))
      return {
        ...state,
        startPlaceFormattedAddress: action.payload
      };
    case StartDataActionTypes.SelectRadius:
      return {
        ...state,
        radius: action.payload
      };

    case StartDataActionTypes.SelectStartPoint:
      return {
        ...state,
        startPoint: action.payload
      };

    case StartDataActionTypes.SelectStartData:
      return {
        ...state,
        startPoint: action.payload.startPoint,
        radius: action.payload.radius,
        startPlaceFormattedAddress: action.payload.startPlaceFormattedAddress
      };

    default:
      return state
  }

}
