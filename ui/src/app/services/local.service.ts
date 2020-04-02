import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebLocalService } from './web-local.service';
import { Local } from '../models/Local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private webLocalService: WebLocalService) {

  }

// for testing yet
createLocal(local: Local){
    return this.webLocalService.post('local', local );
}

getLocalsList() {
  return this.webLocalService.get('local');
}

findLocalById(id: number){
    return this.webLocalService.get('local' + '/' + id);
}




}
