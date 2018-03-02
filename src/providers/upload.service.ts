// import { Observable } from 'rxjs/Rx';
// import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';

// import { GLOBAL } from './global';

@Injectable()
export class UploadService {
  public url: string;
  // public identity;
  public token;

  constructor() {
    // this.url = GLOBAL.urlAPI;
  }

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    token: string,
    name: string
  ) {
    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
  makeFileRequest2(
    url: string,
    params: Array<string>,
    form: FormData,
    token: string,
    name: string
  ) {
    return new Promise((resolve, reject) => {
      let formData: any = form; //new FormData();
      let xhr = new XMLHttpRequest();
      // for (let i = 0; i < files.length; i++) {
      //   formData.append(name, files[i], files[i].name);
      // }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Error', xhr.statusText);
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
