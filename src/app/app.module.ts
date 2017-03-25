import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { YenilerPage } from '../pages/yeniler/yeniler';
import { HakkindaPage } from '../pages/hakkinda/hakkinda';
import { AnimeDetayPage } from '../pages/anime-detay/anime-detay';
import { BolumDetayPage } from '../pages/bolum-detay/bolum-detay';
import { AramaPage } from '../pages/arama/arama';
import { NegatifPage } from '../pages/negatif/negatif';
import { KontrolPage } from '../pages/kontrol/kontrol';
import { GirisPage } from '../pages/giris/giris';
import { ListelerPage } from '../pages/listeler/listeler';
import { PopoverComponent } from './popover'
import { AnimeciService } from '../providers/animeci-service';
import { NotificationHelper } from '../providers/helpers'
import { Listesi } from '../pipes/listesi';
import { Moment } from '../pipes/moment';
import { GroupByPipe } from '../pipes/groupby';
import { BsSplitter } from '../pipes/bs-splitter';
import { AuthService } from '../providers/auth-service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "Bearer",
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
    tokenName: 'id_token'
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    Listesi,
    Moment,
    BsSplitter,
    GroupByPipe,
    YenilerPage,
    AnimeDetayPage,
    BolumDetayPage,
    HakkindaPage,
    AramaPage,
    NegatifPage,
    KontrolPage,
    GirisPage,
    ListelerPage,
    PopoverComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnimeDetayPage,
    BolumDetayPage,
    HakkindaPage,
    YenilerPage,
    AramaPage,
    NegatifPage,
    KontrolPage,
    GirisPage,
    ListelerPage,
    PopoverComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AnimeciService, NotificationHelper, AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }]
})
export class AppModule {}
