import {Address} from './Address';
import {Details} from './Details';
import {Menu} from './Menu';
import {Coordinates} from './Coordinates';
import {OpeningHours} from './OpeningHours';
import {Contact} from './Contact';

export class LocalToAdd {
  name: string;
  coordinates: Coordinates;
  address: Address;
  image: string;
  priceCategory: number;
  openingHours: OpeningHoursToAdd
  localCategories: string[]
  website: string;
  contact: Contact;
}

export class OpeningHoursToAddSchedule {
  orderNumber: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export class OpeningHoursToAdd {
  schedule: OpeningHoursToAddSchedule[]
}


export const InitOpeningHoursToAdd: OpeningHoursToAdd =
  {
    schedule: [
      {
        orderNumber: 0,
        dayOfWeek: 1,
        openTime: "08:00",
        closeTime: "22:00"
      },
      {
        orderNumber: 1,
        dayOfWeek: 2,
        openTime: "08:00",
        closeTime: "22:00"
      },
      {
        orderNumber: 2,
        dayOfWeek: 3,
        openTime: "08:00",
        closeTime: "22:00"
      },
      {
        orderNumber: 3,
        dayOfWeek: 4,
        openTime: "08:00",
        closeTime: "22:00"
      },
      {
        orderNumber: 4,
        dayOfWeek: 5,
        openTime: "08:00",
        closeTime: "22:00"
      },
      {
        orderNumber: 5,
        dayOfWeek: 6,
        openTime: "08:00",
        closeTime:"22:00"
      },
      {
        orderNumber: 6,
        dayOfWeek: 7,
        openTime: "08:00",
        closeTime: "22:00"
      }
    ]
  }
export const InitLocalToAdd: LocalToAdd = {
  name: "",
  address: {street: "", city: "", postCode: ""},
  coordinates: {lat: 0, lon: 0},
  contact: {email: "", phoneNumber: ""},
  image: "",
  openingHours: InitOpeningHoursToAdd,
  localCategories: [""],
  website: "",
  priceCategory: 1,
}

