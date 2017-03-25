import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class NotificationHelper {

    constructor(private alertCtrl: AlertController, public toastCtrl: ToastController) {
    }

    public showAlert(message: string) {
        const alert = this.alertCtrl.create({
            title: 'Animeci',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    public showToast(msj: any, uzun: boolean) {
        let dr = 2000;
        if (uzun) {
            // msj = 'İstek başarısız :( İnternet bağlantısı var mı?';
            dr = 10000;
        }
        const toast = this.toastCtrl.create({
            message: msj,
            duration: dr,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
        });
        toast.present(toast);
    }
}