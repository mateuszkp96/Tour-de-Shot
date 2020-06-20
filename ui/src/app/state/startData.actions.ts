import {Action} from '@ngrx/store';
import {StartPointState, StartDataState} from './startData.reducer';

export enum StartDataActionTypes {
  SelectStartPlace = '[Product] Select Start Place',
  SelectRadius = '[Product] Select Radius',
  SelectStartPointLat = '[Product] Select StartPointLat',
  SelectStartPointLon = '[Product] Select StartPointLon',
  SelectStartPoint = '[Product] Select StartPoint',
  SelectStartData = '[Product] Select StartData',

}

// Action Creators
export class SelectStartPlace implements Action {
  readonly type = StartDataActionTypes.SelectStartPlace;

  constructor(public payload: string) {
  }
}

export class SelectRadius implements Action {
  readonly type = StartDataActionTypes.SelectRadius;

  constructor(public payload: number) {
  }
}

export class SelectStartPointLat implements Action {
  readonly type = StartDataActionTypes.SelectStartPointLat;

  constructor(public payload: number) {
  }
}

export class SelectStartPointLon implements Action {
  readonly type = StartDataActionTypes.SelectStartPointLon;

  constructor(public payload: number) {
  }
}

export class SelectStartPoint implements Action {
  readonly type = StartDataActionTypes.SelectStartPoint;

  constructor(public payload: StartPointState) {
  }
}

export class SelectStartData implements Action {
  readonly type = StartDataActionTypes.SelectStartData;

  constructor(public payload: StartDataState) {
  }
}

export type StartDataActions = SelectStartPlace
  | SelectRadius
  | SelectStartPointLat
  | SelectStartPointLon
  | SelectStartPoint
  | SelectStartData;

