import { Component } from '@angular/core';
import { NavController, ActionSheetController, ActionSheet, LoadingController } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { NotificationHelper } from '../../providers/helpers';
import { AramaPage } from '../arama/arama';
import { AnimeDetayPage } from '../anime-detay/anime-detay';
import { BolumDetayPage } from '../bolum-detay/bolum-detay';
import { KontrolPage } from '../kontrol/kontrol';

@Component({
  selector: 'page-yeniler',
  templateUrl: 'yeniler.html'
})
export class YenilerPage {

  // loadingPopup: Loading;  
  sonList: Array<any>;
  searchKey: string = "";

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private service: AnimeciService,
    private notify: NotificationHelper,
    private loadingCtrl: LoadingController) {
    this.sonBolumler();
  }

  onInput(event) {
    this.navCtrl.push(AramaPage, this.searchKey);
  }

  searchByKeyword(event) {
    // (search)="searchByKeyword($event)"
    this.navCtrl.push(AramaPage, this.searchKey);
    // this.service.getSonAnimeler()//(this.searchKey)
    //   .then(data => {
    //     this.sonList = data;
    //     this.viewMode = "search";
    //   })
    //   .catch(error => alert(error));
  }

  onCancel(event) {
    // this.sonBolumler();
  }

  doRefresh(event) {
    this.service.getSonBolumler()
      .then(data => {
        this.sonList = data;
        event.complete();
      })
      .catch(error => this.notify.showToast(error, true));
  }

  sonBolumler() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });

    loadingPopup.present();

    this.service.getSonBolumler()
      .then(data => {
        this.sonList = data;
        loadingPopup.dismiss();
      })
      .catch(error => {
        this.notify.showToast(error, true);
        loadingPopup.dismiss();
      });
  }

  openActionSheet(son: any) {
    let actionSheet: ActionSheet = this.actionSheetCtrl.create({
      title: son.adi,
      buttons: [
        {
          text: "Bölüm Detayı",
          handler: () => this.navCtrl.push(BolumDetayPage, son.id)
        },
        {
          text: "Anime Detayı",
          handler: () => this.navCtrl.push(AnimeDetayPage, son.anime)
        },
        {
          text: "Kontrol",
          handler: () => this.navCtrl.push(KontrolPage, son.anime.id)
        }
      ]
    });

    actionSheet.present();
  }
}
