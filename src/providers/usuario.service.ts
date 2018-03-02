import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

import { Observable } from 'rxjs/Rx';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
  public urlHostAPI: string;
  public identity;
  public token;
  public usuario: Usuario = new Usuario('', '', '', '', '', '');

  constructor(private _http: HttpClient) {
    this.urlHostAPI = GLOBAL.urlAPI;
    this.usuario = new Usuario('', '', '', '', '', '');
    this.cargarDelStorage();
  }

  signup(user_to_login: Usuario) {
    const _url = `${this.urlHostAPI}/api/usuario?username=${
      user_to_login.UserName
    }&password=${user_to_login.password}`;

    // const _params = JSON.stringify(user_to_login);
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http
      .get(_url, { headers: _headers })
      .map(res => res)
      .catch((error: any) => Observable.throw(error));
  }
  signupToken(user_to_login: Usuario) {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('UserName', user_to_login.UserName);
    body.set('password', user_to_login.password);

    return this._http
      .post(this.urlHostAPI + '/oauth/token', body.toString())
      .map(res => res)
      .catch((error: any) => Observable.throw(error));
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token !== undefined) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
  guardarStorage(
    // id: string,
    token: string,
    usuario: Usuario,
    identity: string
  ) {
    // localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('identity', JSON.stringify(this.identity));

    // localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.identity = identity;
    // this.menu = menu;
  }

  cargarDelStorage() {
    if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      this.identity = JSON.parse(localStorage.getItem('identity'));
    } else {
      this.usuario = null;
      this.token = '';
      this.identity = null;
    }
  }
  LoginFunc() {
    // logeo
    if (this.usuario == null) {
      this.usuario = new Usuario('', '', '', '', '', '');
    }

    this.usuario.UserName = 'Angular123456';
    this.usuario.password = '@QWEasd123';

    this.signup(this.usuario).subscribe(
      response => {
        // console.log(response);
        this.identity = response;

        if (!this.identity || !this.identity.Id) {
          console.log('Error al ingresar');
        } else {
          // obtener token.
          // localStorage.setItem('identity', JSON.stringify(this.identity));

          this.signupToken(this.usuario).subscribe(
            res => {
              this.token = res.access_token;

              if (this.token.length <= 0) {
                console.log('Token no generado');
              } else {
                this.token = 'bearer ' + this.token;
                // localStorage.setItem('token', this.token);

                this.guardarStorage(this.token, this.usuario, this.identity);
                console.log('Token  generado!!!');
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
