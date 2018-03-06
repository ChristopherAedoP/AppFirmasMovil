import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController,
  ToastController,
  App,
  Tabs
} from 'ionic-angular';
import { FirmantesProvider } from '../../providers/firmantes/firmantes';
import { DetalleFirmantePage } from '../detalle-firmante/detalle-firmante';

@Component({
  selector: 'page-firmantes',
  templateUrl: 'firmantes.html'
})
export class FirmantesPage {
  firmantes;
  public loading;
  up;
  constructor(
    public _sf: FirmantesProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private app: App
  ) {}
  ionViewWillEnter() {
    // this.navCtrl.parent.select(1);
    // console.log(this.navCtrl.parent.Tabs);
    this.muestraLoading();
    this.buscaFirmantes();

    this.up = this.navParams.get('up');
    if (this.up != null) {
      const tabsNav = this.app.getNavByIdOrName('myTabs') as Tabs;
      tabsNav.select(1);
      this.up = null;
    }
  }

  buscaFirmantes() {
    this._sf.getFirmantes().subscribe(
      data => {
        // console.log(data);
        this.firmantes = data;
        this.loading.dismiss();
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.mgjError();
      }
    );
  }
  actualizaFirmantes(refresher) {
    this._sf.getFirmantes().subscribe(
      data => {
        // console.log(data);
        this.firmantes = data;
        refresher.complete();
      },
      err => {
        console.log(err);
        refresher.complete();
        this.mgjError();
      }
    );
  }

  presentDetalleFirmanteModal(firmante) {
    this.navCtrl.push(DetalleFirmantePage, {
      firmante: firmante
    });
  }
  public muestraLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando datos....'
    });

    this.loading.present();
  }
  mgjError() {
    let toast = this.toastCtrl.create({
      message: 'No se logró cargar el listado de firmantes',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });

    toast.present();
  }
}
