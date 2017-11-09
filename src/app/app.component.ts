import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/index';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';
import { ProfesionalsListPage, ServicesListPage } from '../pages/index';
import { ApiService } from '../api/api.services';
import { MyServices } from  '../pages/my-services/my-services';
import { MyContracts } from  '../pages/my-contracts/my-contracts';
import {
  Push
} from '@ionic/cloud-angular';
import { Auth,
         User,
} from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';





@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{ title: string, component: any }>;
  session: any;
  ready: boolean;
  loader: any;

  constructor(public platform: Platform,  public statusBar: StatusBar, public splashScreen: SplashScreen, public push: Push, public ctrlAlert: AlertController,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public loadingCtrl: LoadingController

            )

              {  }

  ngOnInit(){
    this.presentProcess('Iniciando');
    this.ready= false;
    this.initializeApp();
    this.pages = [
       { title: 'Inicio', component: HomePage, },
       { title: 'Mi Perfil', component: ProfilePage },
       { title: 'Servicios', component: ServicesListPage },
       { title: 'Prestadores', component: ProfesionalsListPage },
       { title: 'Mis Contrataciones', component: MyContracts },
       // validar si debe aparecer

     ];

     this.pages.push({ title: 'Logout', component: LogoutPage });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if ( this.auth.isAuthenticated() ) {
           this.api.confirmationProfesional( this.user.id )
            .subscribe(
              session => this.session = session,
              err     => console.log( err ),
              ()      => {
                  console.log(this.session);
                 if(this.session.roles.id === 3) {
                   this.pages.push({ title: 'Mis Contratos', component: ProfilePage });
                   this.pages.push({ title: 'Mis Servicios', component: MyServices },);
                 }

                this.statusBar.styleDefault();
                this.splashScreen.hide();
                this.ready = true;
            }
           )
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.loader.dismiss();
    });
  }

  openPage(page) {
     // Reset the content nav to have just this page
     // we wouldn't want the back button to show in this scenario
     this.nav.setRoot(page.component);

   }

   presentProcess(text) {
     this.loader = this.loadingCtrl.create({
       content: text,
       duration: 3000
     });
     this.loader.present();
   }
}
