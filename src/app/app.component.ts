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
import { ApiService } from '../api/api.services';

import { RegisterPage } from '../pages/register/register';
import { MyServices } from  '../pages/my-services/my-services';
import { MyContracts } from  '../pages/my-contracts/my-contracts';

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{ title: string, component: any }>;
  session: any;

  constructor(public platform: Platform,  statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public ctrlAlert: AlertController,
              public api: ApiService,
              public user: User,
              public auth: Auth,

  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
    if ( this.auth.isAuthenticated() ) {
      this.api.confirmationProfesional( this.user.id )
      .subscribe(
        session => this.session = session[0],
        err     => console.log( err ),
        ()      =>  {
                this.api.getProfesional( this.session.id )
                .subscribe(
                    session =>  this.session = session,
                    err     => console.log(err),
                    ()      => {
                      if( this.session.roles[0].id === 2){
                        this.pages = [
                            { title: 'Inicio', component: HomePage },
                            { title: 'Mi Perfil', component: ProfilePage },
                            { title: 'Servicios', component: ServicesListPage },
                            { title: 'Prestadores', component: ProfesionalsListPage },
                            { title: 'Mis Contrataciones', component: MyContracts },
                            // validar si debe aparecer
                            //{ title: 'Mi Actividad', component: ProfilePage },
                            //{ title: 'Mis Servicios', component: ProfilePage },
                            { title: 'Logout', component: LogoutPage },

                          ];

                      }else{
                        this.pages = [
                            { title: 'Inicio', component: HomePage },
                            { title: 'Mi Perfil', component: ProfilePage },
                            { title: 'Servicios', component: ServicesListPage },
                            { title: 'Prestadores', component: ProfesionalsListPage },
                            { title: 'Mis Contrataciones', component: MyContracts },
                            // validar si debe aparecer
                            { title: 'Mis Contratos', component: ProfilePage },
                            { title: 'Mis Servicios', component: MyServices },
                            { title: 'Logout', component: LogoutPage },

                          ];
                      }
                    }
                )
             }
      )
    }



  }

  openPage(page) {
     // Reset the content nav to have just this page
     // we wouldn't want the back button to show in this scenario
     this.nav.setRoot(page.component);

   }
}
