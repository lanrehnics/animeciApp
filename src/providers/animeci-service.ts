import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import { API } from './config';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AnimeciService {
    jwtHelper: JwtHelper = new JwtHelper();
    token: string;

    constructor(public http: Http, public authHttp: AuthHttp) { }

    findAnimeById(id) {
        return this.authHttp.get(API + "Anime/" + id)
            .map(res => res.json())
            .toPromise();
    }

    findBolumById(id) {
        return this.authHttp.get(API + "Bolum/" + id)
            .map(res => res.json())
            .toPromise();
    }

    getBolumlerById(id) {
        return this.authHttp.get(API + "Bolumler/" + id)
            .map(res => res.json())
            .toPromise();
    }

    getBolumleriById(id) {
        return this.authHttp.get(API + "Bolumleri/" + id)
            .map(res => res.json())
            .toPromise();
    }

    findVideoById(id) {
        return this.authHttp.get(API + "Video/" + id)
            .map(res => res.json())
            .toPromise();
    }

    getSonBolumler() {
        return this.authHttp.get(API + "Son/Bolum/")
            .map(res => res.json())
            .toPromise();
    }

    getSonAnimeler() {
        return this.authHttp.get(API + "Son/Anime/")
            .map(res => res.json())
            .toPromise();
    }

    search(q: string) {
        return this.authHttp.get(API + "Ara/" + q)
            .map(res => res.json())
            .toPromise();
    }

    importMal(user) {
        return this.authHttp.get(API + "Import/MalList/" + user)
            .map(res => res.json())
            .toPromise();
    }

    getFavList(kind) {
        return this.authHttp.get(API + "FavList/" + kind)
            .map(res => res.json())
            .toPromise();
    }

    toFavList(id, kind, point) {
        // FavList/{id}/{kind}/{point} // Anime ID
        return this.authHttp.post(API + "FavList/" + id + "/" + kind + "/" + point, {})
            .map(res => res.json())
            .toPromise();
    }

    favBolum(id) {
        // FavBolum/{id} // Bolum ID
        return this.authHttp.post(API + "FavBolum/" + id, {})
            .map(res => res.json())
            .toPromise();
    }

    deleteFavBolum(id) {
        // FavDelBolum/{id} // UBolumListe ID
        return this.authHttp.post(API + "FavDelBolum/" + id, {})
            .map(res => res.text())
            .toPromise();
    }

    deleteFavAnime(id) {
        // FavDel/{id} // UAnimeListe ID
        return this.authHttp.post(API + "FavDel/" + id, {})
            .map(res => res.json())
            .toPromise();
    }

    getNegatifler() {
        return this.authHttp.get(API + "Negatifler")
            .map(res => res.json())
            .toPromise();
    }

    getAnimeForKontrol(id: number) {
        return this.authHttp.get(API + "Export/Kontrol/" + id)
            .map(res => res.json())
            .toPromise();
    }

    updateAnimeWith(id: number, kid: any) {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(kid),
            url: API + "Import/FromKitsu/" + id
        });
        return this.authHttp.request(new Request(requestOptions)).toPromise();
    }

    updAnimeWithMal(id: number, mi: number) {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: "{}",
            url: API + "Import/FromMal/" + id + "?mi=" + mi
        });
        return this.authHttp.request(new Request(requestOptions)).toPromise();
    }

    searchKitsu(q: string) {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: new Headers({ 'Content-Type': 'application/vnd.api+json' }),
            body: '',
            url: "https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + q
        });

        return this.authHttp.request(new Request(requestOptions))
            .map(res => res.json())
            .toPromise();
    }

    kim() {
        return this.authHttp.get(API + 'Uyelik/Kim')
            .map(res => res.json())
            .toPromise();
    }
}
