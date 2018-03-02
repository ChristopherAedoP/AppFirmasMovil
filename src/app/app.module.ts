import { UsuarioService } from './../providers/usuario.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirmantesPage } from '../pages/firmantes/firmantes';
import { FirmantesProvider } from '../providers/firmantes/firmantes';
import { HttpClientModule } from '@angular/common/http';
import { AddFirmantePage } from '../pages/add-firmante/add-firmante';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleFirmantePage } from '../pages/detalle-firmante/detalle-firmante';

//subida de archivos
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { UploadService } from '../providers/upload.service';
import { BuscaFirmantePage } from '../pages/busca-firmante/busca-firmante';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirmantesPage,
    AddFirmantePage,
    DetalleFirmantePage,
    BuscaFirmantePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirmantesPage,
    AddFirmantePage,
    DetalleFirmantePage,
    BuscaFirmantePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirmantesProvider,
    UsuarioService,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    UploadService
  ]
})
export class AppModule {}
