import { State, Action, StateContext, Selector } from '@ngxs/store';
import { StartData } from './../models/StartData'
import { AddStartData, RemoveStartData } from './../actions/StartData.actions'
import { Injectable } from '@angular/core';

// Section 2
export class StartDataStateModel {
  tutorials: StartData[];
}

// Section 3
@State<StartDataStateModel>({
  name: 'StartData',
  defaults: {
   tutorials: []
  }
})

@Injectable()
export class StartDataState {

  // Section 4
  @Selector()
  static getTutorials(state: StartDataStateModel) {
    return state.tutorials
  }

  // Section 5
  @Action(AddStartData)
  add({getState, patchState }: StateContext<StartDataStateModel>, { payload }:AddStartData) {
    const state = getState()
    patchState({
      tutorials: [...state.tutorials, payload]
    })
  }

  @Action(RemoveStartData)
  remove({getState, patchState }: StateContext<StartDataStateModel>, { payload}:RemoveStartData) {
    patchState({
      tutorials: []
    })
  }

}
