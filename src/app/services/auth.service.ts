import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://www.eggion.com/_functions/';
  jwt = new JwtHelperService();

  referrerPageURL = 'https://eggion.com/';
  timer: any;
  constructor(
    private readonly http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}


  initialCheck() {
      const loginPageURLforReferrer = 'https://eggion.com/';
      const loginPageURLforToken = 'https://eggion.com/';

      const isGoogle = this.checkGoogleAuthenticate();

      if (!this.checkReferrer() && !isGoogle) {
        console.log('Invalid Referrer!');
        // window.location.href = loginPageURLforReferrer;
      } else if (!this.validateToken() && !isGoogle) {
        console.log('Invalid Token!');
        // window.location.href = loginPageURLforToken;
      } else if (isGoogle) {
        console.log('Authenticated with Google!');
        // this.router.navigate(['/registration/signup']);
      }
  }

  // isAuthenticated(): boolean {
  //   const token = this.getTokenFromLocalStorage();
  //
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  checkToken(token: string ): boolean {

    return !this.jwtHelper.isTokenExpired(token);
  }

  validateToken() {
    const queryParams = this.router.getCurrentNavigation().extractedUrl.queryParams;
    const token = queryParams.t;
    if (!token || token == '') {

      return false;
    }
    if (this.checkToken(token)) {
      //this.updateLocalStorage(token);
      //this.startTokenTimer(this.jwtHelper.getTokenExpirationDate(token));

      return true;
    }

    return false;

  }

  checkReferrer() {
    const referrer = document.referrer;
    console.log('Referrer: ' + referrer);

    if (referrer ==  this.referrerPageURL){
      localStorage.setItem('referrer', referrer);

      return true;
    }

    return false;

  }

  checkGoogleAuthenticate() {
    const queryParams = this.router.getCurrentNavigation().extractedUrl.queryParams;
    const code = queryParams.code;
    if (!code || code == '') {

      return false;
    }
    localStorage.setItem('CODE', code);

    return true;
  }


  // refreshToken() {
  //   const token = localStorage.getItem('access_token');
  //   const body = {
  //     token
  //   };
  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json',
  //   //    'Authorization': 'JWT ' + token
  //   //   })
  //   // };
  //   return this.http.put(this.BASE_URL + 'refreshToken', JSON.stringify(body)).pipe(
  //
  //     map(
  //       (data) => {
  //         this.updateLocalStorage(data.refresh);
  //         this.startTokenTimer(this.jwtHelper.getTokenExpirationDate(data.refresh));
  //       })
  //
  //   );

  // }

}
