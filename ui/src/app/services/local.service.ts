import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebLocalService } from './web-local.service';
import { Local } from '../models/Local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  local: Local;
  localsList: Local[];

  constructor(private webLocalService: WebLocalService) {}


}
