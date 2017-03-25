import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { YenilerPage } from '../pages/yeniler/yeniler';
import { GirisPage } from '../pages/giris/giris';
// import { HakkindaPage } from '../pages/hakkinda/hakkinda';
import { ListelerPage } from '../pages/listeler/listeler';
import { NegatifPage } from '../pages/negatif/negatif';
import { AuthService } from '../providers/auth-service';
import { AnimeciService } from '../providers/animeci-service';
import { Md5 } from 'ts-md5/dist/md5';
import { Events } from 'ionic-angular';
// import { OneSignal } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = YenilerPage;
  user: any;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public auth: AuthService, public alertCtrl: AlertController, public animeci: AnimeciService, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Listem', component: ListelerPage, icon: 'paper' },
      { title: 'Yeniler', component: YenilerPage, icon: 'ios-keypad' },
      { title: 'Negatifler', component: NegatifPage, icon: 'ios-link' }
    ];

  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(GirisPage);
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'MAL Listesini Çek',
      message: "MyAnimeList kullanici adinizi girin lutfen:",
      inputs: [
        {
          name: 'uname',
          placeholder: 'Kullanici Adi'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.animeci.importMal(data.uname);
          }
        }
      ]
    });
    prompt.present();
  }

  initializeApp() {
    this.auth.authenticated().then(bool => {
      if (bool) {
        this.animeci.kim().then(data => {
          console.log(data);
          this.user = data;
          this.user.p = "https://www.gravatar.com/avatar/" + Md5.hashStr(data.email);
        }).catch(error => {
          console.error(error);
        });
      }
      else
        this.rootPage = GirisPage;
    });

    this.events.subscribe('user:profil', (user, time) => {
      this.auth.authenticated().then(bool => {
        if (bool) {
          this.animeci.kim().then(data => {
            console.log(data);
            this.user = data;
            this.user.p = "https://www.gravatar.com/avatar/" + Md5.hashStr(data.email);
          }).catch(error => {
            console.error(error);
          });
        }
      });
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // OneSignal.startInit("788dbe72-43d2-44d4-9273-6682dd653ea7", "1047978554525");

      // OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

      // OneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      // });

      // OneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // OneSignal.endInit();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
