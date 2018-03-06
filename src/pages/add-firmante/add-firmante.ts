import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ViewController,
  App
} from 'ionic-angular';
import { Firmante } from '../../models/firmante';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../providers/usuario.service';
import { FirmantesProvider } from '../../providers/firmantes/firmantes';
// import { FirmantesPage } from '../firmantes/firmantes';

@Component({
  selector: 'page-add-firmante',
  templateUrl: 'add-firmante.html'
})
export class AddFirmantePage {
  public rut;
  public nombre;
  public firmante: Firmante;
  public usuario: Usuario;
  public identity;
  public token;
  public loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _us: UsuarioService,
    private _sf: FirmantesProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public appCtrl: App
  ) {
    this.firmante = new Firmante(0, '', '', 0, '');
    this.usuario = new Usuario('', '', '', '', '', '');
  }

  ionViewWillEnter() {
    this.firmante = new Firmante(0, '', '', 0, '');
    this.usuario = new Usuario('', '', '', '', '', '');
  }

  public muestraLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Guardando datos....'
    });

    this.loading.present();
  }

  btnGuardar(FirmanteForm) {
    if (this.firmante.Rut.trim() == '' || this.firmante.Nombre.trim() == '') {
      return;
    }

    this.muestraLoading();
    this._sf.addFirmante(this._us.getToken(), this.firmante).subscribe(
      (response: any) => {
        this.loading.dismiss();

        if (response && response.Id) {
          this.mgjOk();
          this.firmante = new Firmante(0, '', '', 0, '');
          this.usuario = new Usuario('', '', '', '', '', '');
          // // this.viewCtrl.dismiss();
          // // this.navCtrl.setRoot(FirmantesPage, { up: 'si' });
          // // this.navCtrl.popToRoot();
          // // this.viewCtrl.dismiss();
          // this.navCtrl.setRoot(FirmantesPage, { up: 'si' });
          // this.viewCtrl.dismiss();
          // this.navCtrl.pop();
        } else {
          console.log(response);
          this.loading.dismiss();
          this.mgjError();
        }
      },
      error => {
        console.log(error);
        // console.error(<any>error);
        this.loading.dismiss();
        this.mgjError();
      }
    );
  }
  mgjError() {
    let toast = this.toastCtrl.create({
      message: 'Error al guardar firmante.',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });

    toast.present();
  }
  mgjOk() {
    let toast = this.toastCtrl.create({
      message: 'Firmante Creado!!',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.present();
  }
}
