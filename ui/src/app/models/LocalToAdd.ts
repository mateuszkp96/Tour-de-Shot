import {Address} from './Address';
import {Details} from './Details';
import {Menu} from './Menu';
import {Coordinates} from './Coordinates';
import {OpeningHours} from './OpeningHours';
import {Contact} from './Contact';

export interface LocalToAdd {
  id: number;
  name: string;
  coordinates: Coordinates;
  city: string;
  street: string;
  postCode: string;
  image: string
  openingHours: OpeningHoursToAdd
  localCategories: string[]
  website: string
  email: string;
  phoneNumber: string;
  priceCategory: number
}

export class OpeningHoursToAddSchedule {
  orderNumber: number;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
}

export class OpeningHoursToAdd {
  schedule: OpeningHoursToAddSchedule[]
}


export const InitLocalToAdd: LocalToAdd = {
  id: null,
  name: null,
  coordinates: null,
  city: null,
  street: null,
  postCode: null,
  image: null,
  openingHours: null,
  localCategories: null,
  website: null,
  email: null,
  phoneNumber: null,
  priceCategory: null,
}
