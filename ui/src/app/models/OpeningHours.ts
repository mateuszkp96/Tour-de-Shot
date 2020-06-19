import { OpeningHoursSchedule } from './OpeningHoursSchedule';

export interface OpeningHours {
  openStatus: string
  presentDayIndex: number
  schedule: Array<OpeningHoursSchedule>
}
