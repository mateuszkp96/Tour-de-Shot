import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalLoginService {

  private localId = new Subject<number>();
  private localIdValue: number

  constructor() { }

  getStartPoint(): Observable<number> {
    return this.localId.asObservable();
  }

  updateStartPoint(id: number) {
    this.localId.next(id);
  }
  
  getIdValue(){
    return this.localIdValue
  }



}
