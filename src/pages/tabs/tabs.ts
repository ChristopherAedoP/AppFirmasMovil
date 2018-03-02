import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { FirmantesPage } from '../firmantes/firmantes';
import { AddFirmantePage } from '../add-firmante/add-firmante';
import { UsuarioService } from '../../providers/usuario.service';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { BuscaFirmantePage } from '../busca-firmante/busca-firmante';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = FirmantesPage;
  tab3Root = AddFirmantePage;
  tab4Root = BuscaFirmantePage;

  constructor(public _us: UsuarioService) {
    // console.log('prueba inicio');
    this._us.LoginFunc();
  }
}
