import { Component } from '@angular/core';
import { NavController, LoadingController, PopoverController } from 'ionic-angular';
import { AnimeciService } from '../../providers/animeci-service';
import { AnimeDetayPage } from '../anime-detay/anime-detay';
import { NotificationHelper } from '../../providers/helpers';
import { PopoverComponent } from '../../app/popover';

@Component({
  selector: 'page-listeler',
  templateUrl: 'listeler.html'
})
export class ListelerPage {
  list: Array<any>;
  header: string = "Listem : İzleniyor";

  constructor(
    public navCtrl: NavController,
    public service: AnimeciService,
    public notify: NotificationHelper,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController) {
    // 1 watching // 2 completed // 3 hold // 4 dropped // 6 planto
    this.getFavList(1);
  }

  getFavList(kind) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });

    loadingPopup.present();

    this.service.getFavList(kind)
      .then(data => {
        this.list = data;
        loadingPopup.dismiss();
      })
      .catch(error => {
        this.notify.showToast(error, true);
        loadingPopup.dismiss();
      });
  }

  detayaGit(anime: any) {
    this.navCtrl.push(AnimeDetayPage, anime);
  }

  presentPopover(ev) {
      let popover = this.popoverCtrl.create(PopoverComponent);

      popover.present({
          ev: ev
      });

      popover.onDidDismiss(data => {
          if (data != null || data != undefined) {
              this.getFavList(data);
              switch (data) {
                  case 1:
                      this.header = "Listem : İzleniyor";
                      break;
                  case 2:
                      this.header = "Listem : İzlenmiş";
                      break;
                  case 6:
                      this.header = "Listem : İzlenecek";
                      break;
                  case 3:
                      this.header = "Listem : Beklemede";
                      break;
                  case 4:
                      this.header = "Listem : Bırakılmış";
                      break;
              }
          }
    });
  }
}
