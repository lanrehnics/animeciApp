import { Injectable } from '@angular/core';
import { Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { SERVER_URL, API } from './config';
import { NotificationHelper } from './helpers';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Auth {
  jwtHelper: JwtHelper = new JwtHelper();
  storage: Storage = new Storage();
  user: Object;
  idToken: string;

  constructor(private authHttp: AuthHttp, private notifier: NotificationHelper) {
    // Check if there is a profile saved in local storage
    // this.storage.get('profile').then(profile => {
    //   this.user = JSON.parse(profile);
    // }).catch(error => {
    //   console.log(error);
    // });
    this.storage.get('id_token').then(token => {
      this.idToken = token as string;
    });
  }

  loggedIn() {
    let x = this.storage.get('id_token').then(token => {
      this.idToken = token as string;
      console.log('loggedIn => ' + this.idToken);
      console.log(this.jwtHelper.decodeToken(this.idToken));
      console.log(tokenNotExpired('id_token', this.idToken));
      return tokenNotExpired('id_token', this.idToken);
    });

    return Promise.resolve(x);
  }

  login(id: string, pw: string) {
    this.loginReq(id, pw).then(res => {
      this.idToken = res.json().access_token;
      this.storage.set('id_token', this.idToken);
      console.log('login => ' + this.idToken);
      console.log(tokenNotExpired('id_token', this.idToken));
    })
      .catch(err => {
        this.notifier.showToast(err, true);
      });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
  }

  kim() {
    return this.authHttp.get(API + 'Uyelik/Kim')
      .map(res => res.json())
      .toPromise();
  }

  loginReq(id: string, pw: string) {
    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: 'grant_type=password&username=' + id + '&password=' + pw + '&scope=api1&client_id=animeci.mobilro&client_secret=An1meciiKEY',
      url: SERVER_URL + 'connect/token'
    });
    return this.authHttp.request(new Request(requestOptions)).toPromise();
  }
}
