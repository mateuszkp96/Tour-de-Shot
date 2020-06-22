import {Address} from './Address';
import {Details} from './Details';
import {Menu} from './Menu';
import {Coordinates} from './Coordinates';
import {OpeningHours} from './OpeningHours';
import {Contact} from './Contact';

export class LocalToAdd {
  ownerId: string;
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
  dayOfWeek: string;
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
        dayOfWeek: "MONDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 1,
        dayOfWeek: "TUESDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 2,
        dayOfWeek: "WEDNESDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 3,
        dayOfWeek: "THURSDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 4,
        dayOfWeek: "FRIDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 5,
        dayOfWeek: "SATURDAY",
        openTime: " ",
        closeTime: " "
      },
      {
        orderNumber: 6,
        dayOfWeek: "SUNDAY",
        openTime: " ",
        closeTime: " "
      }
    ]
  }
export const InitLocalToAdd: LocalToAdd = {
  ownerId: "",
  name: "",
  address: {street: "", city: "", postCode: ""},
  coordinates: {lat: 0, lon: 0},
  contact: {email: "", phoneNumber: ""},
  image: "",
  openingHours: InitOpeningHoursToAdd,
  localCategories: [""],
  website: " ",
  priceCategory: 0,
}

