import {Address} from './Address';
import {Details} from './Details';
import {Menu} from './Menu';
import {Coordinates} from './Coordinates';
import {OpeningHours} from './OpeningHours';
import {Contact} from './Contact';

export class LocalToModify {
  name: string;
  coordinates: Coordinates;
  address: Address;
  image: string;
  openingHours: OpeningHoursToModify
  localCategories: string[]
  website: string;
  contact: Contact;

}

export class OpeningHoursToModifySchedule {
  orderNumber: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export class OpeningHoursToModify {
  schedule: OpeningHoursToModifySchedule[]
}


export const InitOpeningHoursToModify: OpeningHoursToModify =
  {
    schedule: [
      {
        orderNumber: 0,
        dayOfWeek: 1,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 1,
        dayOfWeek: 2,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 2,
        dayOfWeek: 3,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 3,
        dayOfWeek: 4,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 4,
        dayOfWeek: 5,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 5,
        dayOfWeek: 6,
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 6,
        dayOfWeek: 7,
        openTime: " ",
        closeTime: " "
      }
    ]
  }
export const InitLocalToModify: LocalToModify = {
  name: "",
  address: {street: "", city: "", postCode: ""},
  coordinates: {lat: 0, lon: 0},
  contact: {email: "", phoneNumber: ""},
  image: "",
  openingHours: InitOpeningHoursToModify,
  localCategories: [" "],
  website: " ",
}

