import 'rxjs/add/operator/do';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {UserAuthService} from './services/user-auth.service';
import {Injectable} from '@angular/core';
import {AuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  idToken: any

  constructor(private userAuth: UserAuthService,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient) {
    this.authService.authState.subscribe(authState => this.idToken = authState.idToken)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.idToken}`
      },
      withCredentials: true
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

       // if (err.status === 401) {
       //   this.userAuth.collectFailedRequest(request);
          //this.router.navigate(['']);
       // }
      }
    }));
  }

}
