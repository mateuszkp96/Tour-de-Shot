import {State, Action, StateContext, Selector} from '@ngxs/store';
import {StartData} from './../state/models/StartData'
import {AddStartData, RemoveStartData,RemoveAllStartData}  from './../actions/StartData.actions'
import {Injectable} from '@angular/core';


export class StartDataStateModel {
  tutorials: StartData[];
}

@State<StartDataStateModel>({
  name: 'StartData',
  defaults: {
    tutorials: []
  }
})

@Injectable()
export class StartDataState {

  @Selector()
  static getTutorials(state: StartDataStateModel) {
    return state.tutorials
  }

  @Action(AddStartData)
  add({getState, patchState}: StateContext<StartDataStateModel>, {payload}: AddStartData) {
    const state = getState()
    patchState({
      tutorials: [...state.tutorials, payload]
    })
  }

  @Action(RemoveStartData)
  remove({getState, patchState}: StateContext<StartDataStateModel>, {payload}: RemoveStartData) {
    patchState({
      //leaving states from payload index
      tutorials: getState().tutorials.slice(payload, getState().tutorials.length+1)
    })
  }

  @Action(RemoveAllStartData)
  removeAll({getState, patchState}: StateContext<StartDataStateModel>, RemoveAllStartData) {
    patchState({
      tutorials: []
    })
  }

}
