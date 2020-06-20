import { StartData } from './../state/models/StartData'

export class AddStartData {
  static readonly type = '[StartData] Add'

  constructor(public payload: StartData) {}
}

export class RemoveStartData {
  static readonly type = '[StartData] Remove'

  constructor(public payload: number) {}
}

export class RemoveAllStartData {
  static readonly type = '[StartData] AllRemove'

  constructor() {}
}
