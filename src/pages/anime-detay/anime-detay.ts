import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ActionSheet, LoadingController, Loading } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { NotificationHelper } from '../../providers/helpers';
import { BolumDetayPage } from '../bolum-detay/bolum-detay';

@Component({
    selector: 'page-anime-detay',
    templateUrl: 'anime-detay.html'
})
export class AnimeDetayPage {
    anime: any;
    bolumleri: Array<any>;
    secim: string;
    loadingPopup: Loading;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private navCtrl: NavController,
        private service: AnimeciService,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private notify: NotificationHelper) {
        this.anime = this.navParams.data;
        // this.anime.guncel = moment(this.anime.guncel).locale('tr').fromNow();
        // this.anime.eklendi = moment(this.anime.eklendi).locale('tr').fromNow();
        this.secim = 'bilgiler';
        console.log(this.anime);
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Yükleniyor...'
        });
        this.getBolumleri();
    }

    getBolumleri() {
        this.loadingPopup.present();

        this.service.getBolumlerById(this.anime.id)
            .then(data => {
                this.bolumleri = data;
                this.loadingPopup.dismiss();
            })
            .catch(error => {
                this.notify.showToast(error, true);
                this.loadingPopup.dismiss();
            });
    }

    bolumCallbackFn = (_params) => {
        return new Promise((resolve, reject) => {
            let izlenen = this.bolumleri.find(o => o.id == _params.id);
            izlenen.liste = true;
            resolve();
        });
    }

    bolumeGit(b: any) {
        this.navCtrl.push(BolumDetayPage, { bid: b.id, callback: this.bolumCallbackFn });
    }

    bilgiler() {
        this.secim = 'bilgiler';
    }

    bolumler() {
        this.secim = 'bolumler';
    }

    fav(b) {
        this.service.favBolum(b.id)
            .then(data => {
                console.log(data);
                b.liste = data;
                this.notify.showToast("Bölüm izlenmiş listesine alındı", false);
            })
            .catch(error => {
                this.notify.showToast(error, true);
            });
    }

    deleteFav(b) {
        this.service.deleteFavBolum(b.liste.id)
            .then(data => {
                b.liste = null;
                this.notify.showToast("Bölüm izlenmiş listesinden çıkartıldı", false);
            })
            .catch(error => {
                this.notify.showToast(error, true);
            });
    }

    add2Fav() {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: "Listeye Ekle",
            buttons: [
                {
                    text: "İzlenmiş",
                    handler: () => this.service.toFavList(this.anime.id, 2, 0).then(data => {
                        this.anime.liste = data;
                    }).catch(error => {
                        this.notify.showToast(error, true);
                    })
                },
                {
                    text: "İzleniyor",
                    handler: () => this.service.toFavList(this.anime.id, 1, 0).then(data => {
                        this.anime.liste = data;
                    }).catch(error => {
                        this.notify.showToast(error, true);
                    })
                },
                {
                    text: "Beklemede",
                    handler: () => this.service.toFavList(this.anime.id, 3, 0).then(data => {
                        this.anime.liste = data;
                    }).catch(error => {
                        this.notify.showToast(error, true);
                    })
                },
                {
                    text: "Bırakılmış",
                    handler: () => this.service.toFavList(this.anime.id, 4, 0).then(data => {
                        this.anime.liste = data;
                    }).catch(error => {
                        this.notify.showToast(error, true);
                    })
                },
                {
                    text: "İzlenecek",
                    handler: () => this.service.toFavList(this.anime.id, 6, 0).then(data => {
                        this.anime.liste = data;
                    }).catch(error => {
                        this.notify.showToast(error, true);
                    })
                }
            ]
        });

        actionSheet.present();
    }
}
