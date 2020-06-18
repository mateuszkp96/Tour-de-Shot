import { Address } from './Address';
import { Details } from './Details';
import { Menu } from './Menu';
import { Coordinates } from './Coordinates';
import { OpeningHours } from './OpeningHours';
import { Contact } from './Contact';

export interface LocalDetailed {
  id: number;
  name: string;
  coordinates: Coordinates;
  address: Address;
  image: string    // change image type
  localCategories: Array<String>
  priceCategory: number
  openingHours: OpeningHours
  website: string
  contact: Contact
  menu: Menu;
}
