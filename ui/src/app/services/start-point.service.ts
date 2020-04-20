import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartPointService {

  private startPoint = new Subject<google.maps.LatLng>();
  private startPointValue: google.maps.LatLng;
  
  constructor() { }

  getStartPoint(): Observable<google.maps.LatLng> {
    return this.startPoint.asObservable();
  }

  updateStartPoint(startPoint: google.maps.LatLng) {
    this.startPoint.next(startPoint);
    this.startPointValue = startPoint;
  }

  getStartPointValue() {
    return this.startPointValue;
  }

}
