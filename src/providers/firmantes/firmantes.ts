import { Firma } from './../../models/firma';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Firmante } from '../../models/firmante';
/*
  Generated class for the FirmantesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirmantesProvider {
  private urlHostAPI = '';

  constructor(private _http: HttpClient) {
    this.urlHostAPI = GLOBAL.urlAPI;
  }

  getFirmantes() {
    const _url = `${this.urlHostAPI}/api/Firmantes`;

    return this._http
      .get(_url)
      .map(res => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getFirmante(id: string) {
    const _url = `${this.urlHostAPI}/api/Firmante/${id} `;

    return this._http
      .get(_url)
      .map(res => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addFirmante(token, firmante: Firmante) {
    const _url = `${this.urlHostAPI}/api/Firmante `;
    // console.log('addFirmante', firmante);
    // console.log('token', token);
    const body = JSON.stringify(firmante);

    const headers = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json'
    });

    return this._http
      .post(_url, body, { headers })
      .map(res => res)
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        return Observable.throw(err);
      });
  }

  updateFirmante(token, firmantes: Firmante) {
    const _url = `${this.urlHostAPI}/api/Firmante `;

    const body = JSON.stringify(firmantes);

    const headers = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json'
    });

    // console.log('body', body);

    return this._http
      .put(_url, body, { headers })
      .map(res => res)
      .catch((error: any) => error);
  }

  deleteFirmante(token, id) {
    const _url = `${this.urlHostAPI}/api/Firmante/${id} `;

    const headers = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json'
    });

    return this._http
      .delete(_url, { headers })
      .map(res => res)
      .catch(error => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  GetFirmaImage(rut) {
    const _url = `${this.urlHostAPI}/api/FirmaImagexRutBase64?rut=${rut} `;

    return this._http
      .get(_url)
      .map(res => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addFirmanteImg(token: string, firmanteid: string, imgbase64: Firma) {
    console.log(firmanteid);
    const _url = `${this.urlHostAPI}/api/FirmaImageBase64/${firmanteid} `;

    const body = JSON.stringify(imgbase64);

    const headers = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json'
    });

    return this._http
      .post(_url, body, { headers })
      .map(res => res)
      .catch(error => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}
