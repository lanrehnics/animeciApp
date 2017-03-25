import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { NotificationHelper } from '../../providers/helpers';
import { KontrolPage } from '../kontrol/kontrol';

@Component({
  selector: 'page-negatif',
  templateUrl: 'negatif.html'
})
export class NegatifPage {

  negatifler: Array<any>;

  constructor(public navCtrl: NavController,
    public service: AnimeciService,
    public loadingCtrl: LoadingController,
    public notify: NotificationHelper) {
    this.getNegatifler();
  }
  ionViewDidLoad() {
    console.log('Hello NegatifPage Page');
  }

  doRefresh(event) {
    this.service.getNegatifler()
      .then(data => {
        this.negatifler = data;
        event.complete();
      })
      .catch(error => this.notify.showToast(error, true));
  }

  getNegatifler() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });

    loadingPopup.present();
    this.service.getNegatifler()
      .then(data => {
        this.negatifler = data;
        loadingPopup.dismiss();
      })
      .catch(error => {
        this.notify.showToast(error, true);
        loadingPopup.dismiss();
      });
  }

  kontroleGit(negatif: any) {
    this.navCtrl.push(KontrolPage, negatif);
  }
}
