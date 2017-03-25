import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './config';
import { Events } from 'ionic-angular';

@Injectable()
export class AuthService {
  LOGIN_URL: string = SERVER_URL + 'connect/token';
  SIGNUP_URL: string = "http://localhost:3001/users";
  contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
  local: Storage = new Storage();
  jwtHelper: JwtHelper = new JwtHelper();
  userId: string;
  error: string;
  constructor(private http: Http, public events: Events) {
    // this.local.get('id_token').then(token => {
    //   console.log('token ctor:' + token + '\n' + tokenNotExpired('id_token', token));
    //   if (token) {
    //     this.token = token;
    //     this.userId = this.jwtHelper.decodeToken(token).sub;
    //   }
    // });
  }
  public authenticated() {
    let x = this.local.get('id_token').then(token => {
      console.log('authenticated:' + token + '\n' + tokenNotExpired('id_token', token));
      // console.log(this.jwtHelper.decodeToken(token));
      if (token) {
        return tokenNotExpired('id_token', token);
      }
    });

    return Promise.resolve(x);
  }
  login(id: string, pw: string) {
    return new Promise((resolve, reject) => {
      let requestOptions = new RequestOptions({
        method: RequestMethod.Post,
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        body: 'grant_type=password&username=' + id + '&password=' + pw + '&scope=api1&client_id=animeci.mobilro&client_secret=An1meciiKEY',
        url: SERVER_URL + 'connect/token'
      });

      this.http.request(new Request(requestOptions))
        .map(res => res.json())
        .subscribe(
        data => {
          this.authSuccess(data.access_token);
          resolve(data)
        },
        err => {
          this.error = err;
          reject(err)
        }
        );
    });
  }
  signup(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
        data => {
          this.authSuccess(data.id_token);
          resolve(data)
        },
        err => {
          this.error = err;
          reject(err)
        }
        );
    });
  }
  logout() {
    // this.local.set('id_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
    this.local.remove('id_token');
    this.userId = null;
  }
  authSuccess(token) {
    this.error = null;
    this.local.set('id_token', token);
    this.userId = this.jwtHelper.decodeToken(token).sub;
    this.events.publish('user:profil', this.userId, Date.now());
    console.log(this.userId + '\n' + token);
  }
}