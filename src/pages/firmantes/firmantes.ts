import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController
} from 'ionic-angular';
import { FirmantesProvider } from '../../providers/firmantes/firmantes';
import { DetalleFirmantePage } from '../detalle-firmante/detalle-firmante';

/**
 * Generated class for the FirmantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-firmantes',
  templateUrl: 'firmantes.html'
})
export class FirmantesPage implements OnInit {
  firmantes;
  public loading;
  constructor(
    public _sf: FirmantesProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.buscaFirmantes();
  }

  buscaFirmantes() {
    this._sf.getFirmantes().subscribe(data => {
      // console.log(data);
      this.firmantes = data;
      this.loading.dismiss();
    });
  }
  ngOnInit() {
    this.muestraLoading();
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad FirmantesPage');
  }
  presentDetalleFirmanteModal(firmante) {
    this.navCtrl.push(DetalleFirmantePage, {
      firmante: firmante
    });
    // DetalleFirmantePageModal.present();
  }
  public muestraLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando datos....'
    });

    this.loading.present();
  }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.buscaFirmantes();

  //   let val = ev.target.value;

  //   if (val && val.trim() != '') {
  //     this.firmantes = this.firmantes.filter(item => {
  //       return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
  //     });
  //   }
  // }
}
