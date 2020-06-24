import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient}
  from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {AuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  idToken: any

  constructor(private http: HttpClient, 
              private router: Router, 
              private authService: AuthService) {
    this.authService.authState.subscribe(authState => this.idToken = authState.idToken)
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloned = req.clone({
      setHeaders: {
        Authorization: `${this.idToken}`
      },
    });

    return next.handle(cloned);
  }
}
