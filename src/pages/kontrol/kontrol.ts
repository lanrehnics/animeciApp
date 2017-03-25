import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { NotificationHelper } from '../../providers/helpers';

@Component({
    selector: 'page-kontrol',
    templateUrl: 'kontrol.html'
})
export class KontrolPage {

    durum: string;
    id: number;
    anime: Anime;
    kitsus: any;
    gOzet: boolean;

    constructor(public navCtrl: NavController,
        public service: AnimeciService,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public notify: NotificationHelper) {
        this.id = this.navParams.data;
        this.getKontrol(this.id);
    }

    toggleOzet() {
        this.gOzet = !this.gOzet;
    }

    eventHandler(keyCode) {
        if (keyCode == 13) {
            this.updMal(this.anime.id);
        }
    }

    ionViewDidLoad() {
        console.log('Hello KontrolPage Page');
    }

    getKontrol(id: number) {
        let loadingPopup = this.loadingCtrl.create({
            content: 'Yükleniyor...'
        });

        loadingPopup.present();

        this.service.getAnimeForKontrol(id)
            .then(data => {
                this.anime = data;
                loadingPopup.dismiss();
                this.getKitsus(this.anime.adi);
            })
            .catch(error => {
                this.notify.showToast(error, true);
                loadingPopup.dismiss();
            });
    }

    getKitsus(q: string) {
        let loadingPopup = this.loadingCtrl.create({
            content: 'Yükleniyor...'
        });

        loadingPopup.present();

        this.service.searchKitsu(q)
            .then(data => {
                this.kitsus = data;
                console.log(this.kitsus);
                loadingPopup.dismiss();
            })
            .catch(error => {
                this.notify.showToast(error, true);
                loadingPopup.dismiss();
            });
    }

    updateWith(id: number, k: any) {
        this.service.updateAnimeWith(id, k)
            .then(res => { this.getKontrol(id); this.notify.showToast(res.text(), false); })
            .catch(error => this.notify.showToast(error, true));
    }

    updMal(id: number) {
        this.service.updAnimeWithMal(id, this.anime.malID)
            .then(res => { this.getKontrol(id); this.notify.showToast(res.text(), false); })
            .catch(error => this.notify.showToast(error, true));
    }
}

interface Anime {
    id: number;
    adi: string;
    alternatif: string;
    ozet: string;
    taid: number;
    yili: string;
    url: string;
    poster: string;
    bolumSayisi: string;
    turleri: string[];
    malInfo: boolean;
    malID: number;
    malGuncel: Date;
    guncel: Date;
    atarashii: string;
    sure: number;
    tip: string;
}