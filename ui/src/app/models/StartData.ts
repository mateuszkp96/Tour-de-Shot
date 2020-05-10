import {} from '@angular/google-maps'

export interface StartData {
  //startPoint: google.maps.LatLng; //errors while parsing
  id: number
  startPointLat: number
  startPointLon: number
  startPlace: google.maps.places.PlaceResult;
  radius: number;
  pageNumber: number;
}
