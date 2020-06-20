import * as fromRoot from '../state/App.state'
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {StartDataActionTypes} from './startData.actions';
import {LocalLoginActions, LocalLoginActionTypes} from './localLogin.actions';

export interface AppState extends fromRoot.AppState {
  localLogin: LocalLoginState
}

export class LocalLoginState {
  localLoggedIn: boolean
  localId: number
}

const initialLocalLoginState: LocalLoginState = {
  localLoggedIn: false,
  localId: null
}


// Selector functions
const getLocalLoginFeatureState = createFeatureSelector<LocalLoginState>('localLogin');

export const getLocalLoggedIn = createSelector(
  getLocalLoginFeatureState,
  state => state.localLoggedIn
);

export const getLocalId = createSelector(
  getLocalLoginFeatureState,
  state => state.localId
);


export function localReducer(state = initialLocalLoginState, action: LocalLoginActions): LocalLoginState {

  switch (action.type) {
    case LocalLoginActionTypes.SelectLocalLoggedIn:
      console.log(action.payload)
      return {
        ...state,
        localLoggedIn: action.payload
      };
    case LocalLoginActionTypes.SelectLocalId:
      console.log(action.payload)
      return {
        ...state,
        localId: action.payload
      };


    default:
      return state
  }

}
