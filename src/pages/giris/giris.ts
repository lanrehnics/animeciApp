import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
// import { AnimeciService } from '../../providers/animeci-service';
import { AuthService } from '../../providers/auth-service';
import { NotificationHelper } from '../../providers/helpers';
import { YenilerPage } from '../yeniler/yeniler';

@Component({
  selector: 'page-giris',
  templateUrl: 'giris.html'
})
export class GirisPage {
  viewLogin: boolean = true;
  user = {
    id: '',
    pw: ''
  };

  constructor(public navCtrl: NavController, public auth: AuthService, public notifier: NotificationHelper, public loadCtrl: LoadingController) {
    auth.authenticated().then(bool => {
      if (bool)
        this.navCtrl.setRoot(YenilerPage);
      else
        this.notifier.showToast('Oturumunuz zaman aşımına uğradı, lütfen tekrar giriş yapınız.', false);
    });
  }

  login(user: any) {
    this.auth.login(user.id, user.pw).then(
      (success) => {
        this.navCtrl.setRoot(YenilerPage);
      },
      (err) => {
        console.log(err);
        this.notifier.showToast(err, true);
      }
    );
  }

  signupForm() {
    this.viewLogin = false;
  }
}
