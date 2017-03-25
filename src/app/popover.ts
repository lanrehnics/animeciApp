import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
    template: `
    <ion-list>
      <ion-item track="izlenmis" (click)="close(2)">
        İzlenmiş 
      </ion-item>
      <ion-item track="izleniyor" (click)="close(1)">
        İzleniyor 
      </ion-item>
      <ion-item track="izlenecek" (click)="close(6)">
        İzlenecek 
      </ion-item>
      <ion-item track="beklemede" (click)="close(3)">
        Beklemede 
      </ion-item>
      <ion-item track="birakilmis" (click)="close(4)">
        Bırakılmış
      </ion-item>
    </ion-list>
 `
})
export class PopoverComponent {
    constructor(private viewCtrl: ViewController) {
    }

    close(selectedItem) {
        this.viewCtrl.dismiss(selectedItem);
    }
}