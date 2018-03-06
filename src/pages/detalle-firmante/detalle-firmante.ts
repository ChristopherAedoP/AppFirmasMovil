import { Firma } from './../../models/firma';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario.service';
import { FirmantesProvider } from '../../providers/firmantes/firmantes';

import { Camera } from '@ionic-native/camera';
import { GLOBAL } from '../../providers/global';

@Component({
  selector: 'page-detalle-firmante',
  templateUrl: 'detalle-firmante.html'
})
export class DetalleFirmantePage {
  public firmante;

  // lastImage: string = null;
  loading: Loading;

  imageURI: any;
  imageFileName: any;
  nuevaImg: boolean = false;

  public url: string;
  public files_to_upload: Array<File>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public _us: UsuarioService,
    private _sf: FirmantesProvider,
    public alertCtrl: AlertController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController // public _ups: UploadService
  ) {
    // console.log('firmante', navParams.get('firmante'));
    this.firmante = navParams.get('firmante');
    this.nuevaImg = false;
    this.url = GLOBAL.urlAPI;
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetalleFirmantePage');
  // }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  goBack() {
    this.navCtrl.pop();
  }
  btnGuardar(FirmanteForm) {
    this.muestraLoading('Guardando datos....');
    var d = new Date();
    let imgbase64 = new Firma(
      0,
      `firma-${this.firmante.Id}-${
        this.firmante.Rut
      }-${d.getDate()}.jpeg`.replace(/\s/g, ''),
      this.imageURI,
      false
    );

    this._sf
      .addFirmanteImg(this._us.getToken(), this.firmante.Id, imgbase64)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.firmante.IdFirma = response.idFirma;
          this.firmante.UrlFirma = response.urlFirma;
          // console.log(this.firmante);
          this._sf.updateFirmante(this._us.getToken(), this.firmante).subscribe(
            response => {
              // console.log(response);
              this.goBack();
              this.loading.dismiss();
            },
            error => {
              console.log(error);
              // console.error(<any>error);
            }
          );
        },
        error => {
          console.log(<any>error);
          // console.error(<any>error);
          this.loading.dismiss();
        }
      );
  }
  public muestraLoading(msj) {
    this.loading = this.loadingCtrl.create({
      content: msj
    });

    this.loading.present();
  }
  //SUBIDA IMAGEN
  //////////////////////////////
  //
  getImage() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };

    const options2 = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options2).then(
      imageData => {
        this.imageURI = imageData;
        this.imageFileName = imageData;
        this.nuevaImg = true;
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  btnBorrar() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar',
      message:
        '¿Esta seguro de borrar el firmante: ' + this.firmante.Nombre + '?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('click cancelar');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('click si');
            this.muestraLoading('Borrando firmante....');
            this._sf
              .deleteFirmante(this._us.getToken(), this.firmante.Id)
              .subscribe(
                response => {
                  console.log(response);
                  this.goBack();
                  this.loading.dismiss();
                },
                error => {
                  console.log(error);
                  this.presentToast('Error Borrar Firmante.');
                  this.loading.dismiss();
                }
              );
          }
        }
      ]
    });
    confirm.present();
  }
}
