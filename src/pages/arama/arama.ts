import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { AnimeDetayPage } from '../anime-detay/anime-detay';
import { NotificationHelper } from '../../providers/helpers';

/*
  <ion-grid>
    <ion-row>
      <ion-col color="primary">
        <ion-label stacked>Tür:</ion-label>
        <ion-select [(ngModel)]="tur">
          <ion-option *ngFor="let t of turler" [value]="t">{{t}}</ion-option>
        </ion-select>
      </ion-col>
      <ion-col color="secondary">
        <ion-label stacked>Tip:</ion-label>
        <ion-select [(ngModel)]="tip">
          <ion-option value="Movie">Movie</ion-option>
          <ion-option value="TV">TV</ion-option>
          <ion-option value="Music">Music</ion-option>
          <ion-option value="ONA">ONA</ion-option>
          <ion-option value="OVA">OVA</ion-option>
          <ion-option value="Special">Special</ion-option>
        </ion-select>
      </ion-col>
    </ion-row>
    <ion-row color="danger">
      <ion-col>
        <ion-input type="text" [(ngModel)]="searchKey" placeholder="Ara"></ion-input>
        <!--<ion-searchbar [(ngModel)]="searchKey" placeholder="Ara" (search)="searchByKeyword($event)"></ion-searchbar>-->
        <button item-right ion-button>
        <ion-icon name="search"></ion-icon>
      </button>
      </ion-col>
    </ion-row>
  </ion-grid>
  */
@Component({
  selector: 'page-arama',
  templateUrl: 'arama.html'
})
export class AramaPage {

  list: Array<any>;
  searchKey: string;
  tip: string;
  turler: any = ["Aksiyon", "Askeri", "Bilim-Kurgu", "Büyü", "Dedektif", "Doğaüstü-Güçler", "Dram", "Dövüş", "Ecchi", "Fantastik", "Gerilim", "Gizem", "Harem", "Hazine-Avcılığı", "Josei", "Komedi", "Korku", "Macera", "Mecha", "Movie", "Müzik", "Ninja", "OVA", "Okul", "Oyun", "Politik", "Psikolojik", "Romantizm", "Seinen", "Shoujo", "Shoujo-Ai", "Shounen", "Shounen-Ai", "Slice-of-Life", "Spor", "Süper-Güç", "Tarihi", "Tuhaf", "Uzay", "Vampir", "Yaoi", "Yuri"];
  tur: string;

  constructor(
    public navCtrl: NavController,
    public service: AnimeciService,
    public notify: NotificationHelper,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
    this.searchKey = this.navParams.data;
    this.searchByKeyword(null);
  }

  detayaGit(anime: any) {
    this.navCtrl.push(AnimeDetayPage, anime);
  }

  searchByKeyword(event) {
    // this.navCtrl.push(AramaPage, this.searchKey);
    let loadingPopup = this.loadingCtrl.create({
      content: 'Aranıyor...'
    });

    loadingPopup.present();
    this.service.search(this.searchKey)
      .then(data => {
        this.list = data;
        loadingPopup.dismiss();
      })
      .catch(error => {
        this.notify.showToast(error, true);
        loadingPopup.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('Hello AramaPage Page');
  }

}
