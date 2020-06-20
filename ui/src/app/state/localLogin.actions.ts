import {Action} from '@ngrx/store';

export enum LocalLoginActionTypes {
  SelectLocalLoggedIn = '[Product] Select LoggedIn',
  SelectLocalId = '[Product] Select LocalId',

}

// Action Creators
export class SelectLocalLoggedIn implements Action {
  readonly type = LocalLoginActionTypes.SelectLocalLoggedIn;

  constructor(public payload: boolean) {
  }
}

export class SelectLocalId implements Action {
  readonly type = LocalLoginActionTypes.SelectLocalId;

  constructor(public payload: number) {
  }
}


export type LocalLoginActions = SelectLocalLoggedIn
  | SelectLocalId;

