import {} from '@angular/google-maps'

export interface StartData {
  startPoint: google.maps.LatLng;
  startPlace: google.maps.places.PlaceResult;
  radius: number;
}
