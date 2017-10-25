import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';

import { Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/index';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';

import { detailPage } from '../pages/detail/detail';
import { ProfilePage } from '../pages/profile/profile';
import { ProfesionalsPage } from '../pages/profesionals/profesionals';
import { ProfesionalsListPage, ServicesListPage } from '../pages/index';

import { RegisterPage } from '../pages/register/register';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,  statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public ctrlAlert: AlertController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Mi Perfil', component: ProfilePage },
        { title: 'Servicios', component: ServicesListPage },
        { title: 'Prestadores', component: ProfesionalsListPage },
        { title: 'Mi Historico', component: ProfilePage },

        // validar si debe aparecer
        { title: 'Mi Actividad', component: ProfilePage },
        { title: 'Mis Servicios', component: ProfilePage },
        { title: 'Mis Solicitudes', component: ProfilePage },

        { title: 'Logout', component: LogoutPage },

      ];
  }

  openPage(page) {
     // Reset the content nav to have just this page
     // we wouldn't want the back button to show in this scenario
     this.nav.setRoot(page.component);

   }
}
