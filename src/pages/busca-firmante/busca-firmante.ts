import { FirmantesProvider } from './../../providers/firmantes/firmantes';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { Firmante } from '../../models/firmante';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-busca-firmante',
  templateUrl: 'busca-firmante.html'
})
export class BuscaFirmantePage {
  public firmante: Firmante;
  public firmaImg;
  public mensaje: String = '';
  public loading = false;
  public loadingpop;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _fs: FirmantesProvider,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  goBack() {
    this.navCtrl.pop();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  public muestraLoading() {
    this.loadingpop = this.loadingCtrl.create({
      content: 'Buscando firmas....'
    });

    this.loadingpop.present();
  }
  btnBuscar(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.muestraLoading();
      this._fs.GetFirmaImage(val).subscribe(
        data => {
          this.loadingpop.dismiss();
          if (data) {
            this.firmaImg = this.sanitizer.bypassSecurityTrustUrl(
              'data:image/png;base64,' + data
            );
          } else {
            this.firmaImg = null;
            this.presentToast();
          }
        },
        error => {
          this.loadingpop.dismiss();
          this.presentToast();
        }
      );
    } else {
      this.firmaImg = null;
    }
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'No se encontro firma.',
      showCloseButton: true,
      position: 'bottom'
    });

    toast.present();
  }
}
