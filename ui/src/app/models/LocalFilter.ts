export class LocalFilter {
  filters: Filter
}

export class Filter {
  localization: FilterLocalization
  categories: FilterCategory[]
}

export class FilterLocalization {
  lat: number
  lon: number
  maxDistance: number
}

export class FilterCategory {
  id: string
  public constructor(idC: string){
    this.id = idC
  }
}


export const InitFilterLocalization: FilterLocalization = {
  lat: null,
  lon: null,
  maxDistance: null,
}

export const InitFilterCategory = new FilterCategory(null)
InitFilterCategory.id= null


export const InitFilter: Filter = {
  localization: InitFilterLocalization,
  categories: []
}

export const InitLocalFilter: LocalFilter = {
  filters: InitFilter,
}


