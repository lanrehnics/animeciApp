import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController, ActionSheet } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { NotificationHelper } from '../../providers/helpers';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'page-bolum-detay',
  templateUrl: 'bolum-detay.html'
})
export class BolumDetayPage {

  id: number;
  bolum: Bolum;
  view: string;
  toPlay: any;
  cVideo: Object;
  callback: any;

  constructor(public navCtrl: NavController,
    public service: AnimeciService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public domSanitizer: DomSanitizer,
    public notify: NotificationHelper) {
    this.id = this.navParams.get('bid');
    this.view = 'list';
    this.getBolum(this.id);
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get('callback');
  }

  ionViewWillLeave() {
    let confirm = this.alertCtrl.create({
      title: 'İzlenmiş işaretlensin mi?',
      message: 'Bu bölümü izlemiş gibi görünüyorsun, izlenmiş olarak işaretlensin mi?',
      buttons: [
        {
          text: 'Hayır',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Evet',
          handler: () => {
            this.service.favBolum(this.id).then(data => {
              this.callback(this.bolum);
              this.notify.showToast("Bölüm izlenmiş listesine alındı", false);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  getBolum(id: number) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });

    loadingPopup.present();

    this.service.findBolumById(id)
      .then(data => {
        this.bolum = data;
        console.log(this.bolum);
        loadingPopup.dismiss();
      })
      .catch(error => {
        this.notify.showToast(error, true);
        loadingPopup.dismiss();
      });
  }

  playHTML5(video: any) {
    this.view = 'html5';
    this.cVideo = video;
    this.toPlay = this.domSanitizer.bypassSecurityTrustResourceUrl("https://href.li/?" + video.src);
  }

  openActionSheet(video: any) {
    let actionSheet: ActionSheet = this.actionSheetCtrl.create({
      title: video.kimin,
      buttons: [
        {
          text: "HTML5 Oynatici",
          handler: () => {
            this.view = 'html5';
            this.toPlay = this.domSanitizer.bypassSecurityTrustResourceUrl(video.src);
          }
        },
        {
          text: "Native Player",
          handler: () => {
            this.view = 'native';
            this.toPlay = video.src;
          }
        },
        {
          text: 'Vazgeç',
          role: 'cancel',
          handler: () => console.log('cancel share')
        }
      ]
    });

    actionSheet.present();
  }
}

// @Pipe({ name: 'safe' })
// export class SafePipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}
//   transform(url) {
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }
// } 

interface Bolum {
  id: number;
  adi: string;
  guncel: Date;
  eklendi: Date;
  liste: any;
  videolar: Array<any>;
  animeID: number;
}