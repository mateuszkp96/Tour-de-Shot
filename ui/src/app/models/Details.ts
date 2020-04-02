import { OpeningHours } from './OpeningHours';

export interface Details {
  email: string;
  phoneNumber: string;
  openingHoursList: Array<OpeningHours>;
}
