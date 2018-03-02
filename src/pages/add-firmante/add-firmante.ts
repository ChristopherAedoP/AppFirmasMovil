import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Firmante } from '../../models/firmante';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../providers/usuario.service';
import { FirmantesProvider } from '../../providers/firmantes/firmantes';
import { FirmantesPage } from '../firmantes/firmantes';



@Component({
  selector: 'page-add-firmante',
  templateUrl: 'add-firmante.html'
})
export class AddFirmantePage implements OnInit {
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
    public loadingCtrl: LoadingController
  ) {
    this.firmante = new Firmante(0, '', '', 0, '');
    this.usuario = new Usuario('', '', '', '', '', '');
  }
  ngOnInit() {
    // this.LoginFunc();
  }

  public muestraLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando datos....'
    });

    this.loading.present();
  }

  btnGuardar(FirmanteForm) {
    this.muestraLoading();
    this._sf.addFirmante(this._us.getToken(), this.firmante).subscribe(
      response => {
        // console.log(response);

        if (response && response.Id) {
          console.log('Firmante creado.');

          this.navCtrl.push(FirmantesPage);
        } else {
          console.log(response);
        }
        this.loading.dismiss();

      },
      error => {
        console.log('Error al crear');
        console.error(<any>error);
        this.loading.dismiss();
      }
    );
  }
}
