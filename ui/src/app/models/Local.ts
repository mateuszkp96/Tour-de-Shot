import { Address } from './Address';
import { Details } from './Details';
import { Menu } from './Menu';

export interface Local {
  id: number;
  name: string;
  ownerId: number;
  coordinates: Coordinates;
  address: Address;
  details: Details;
  menu: Menu;
}
