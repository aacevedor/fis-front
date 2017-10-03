import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';

import { Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/index';
import { HomePage } from '../pages/home/home';
import { LogoutPage } from '../pages/logout/logout';

import { HelloIonicPage } from '../pages/detail/detail';
import { ProfilePage } from '../pages/profile/profile';
import { ProfesionalsPage } from '../pages/profesionals/profesionals';
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
  token : any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public ctrlAlert: AlertController) {
    this.token = '';
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initPushNotification();
      this.initAlert();
    });


    this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Perfil', component: ProfilePage },
        { title: 'Logout', component: LogoutPage },

      ];
  }

  initPushNotification(){
      if( !this.platform.is('cordova')){
          console.warn( "Para iniciar el plugin de notificaciones push, se debe emplear un dispositivo virtual o real" );
          return;
      }

      this.push.register()
      .then((t: PushToken) => {

        return this.push.saveToken(t);
      })
      .then((t: PushToken) => {
        this.token = t.token;
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });
    }

    initAlert() {
      let alert = this.ctrlAlert.create({
        title: '',
        subTitle: 'Token :'+ this.token,
        buttons: ['OK']
      });
      alert.present();
    }

  openPage(page) {
     // Reset the content nav to have just this page
     // we wouldn't want the back button to show in this scenario
     this.nav.setRoot(page.component);

   }
}
