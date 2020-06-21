export class LocalFilterEmpty {
  filters: FilterEmpty
}

export class FilterEmpty {
  localization: FilterLocalizationEmpty
}

export class FilterLocalizationEmpty {
  lat: number
  lon: number
  maxDistance: number
}



export const InitFilterLocalizationEmpty: FilterLocalizationEmpty = {
  lat: 0,
  lon: 0,
  maxDistance: 0,
}


export const InitFilterEmpty: FilterEmpty = {
  localization: InitFilterLocalizationEmpty,
}


export const InitLocalFilterEmpty: LocalFilterEmpty = {
  filters: InitFilterEmpty
}


