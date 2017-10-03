import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/index'
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import { HomePage } from '../pages/index';
import { HelloIonicPage } from '../pages/index';
import { ProfilePage } from '../pages/index';
import { ProfesionalsPage } from '../pages/index';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';

import { ProfileService } from '../app/app.services';
import { ProfesionalsService } from '../app/app.services';
import { ApiService } from '../api/api.services';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cbfb714c'
  },
  'push': {
    'sender_id': '658032209771',
    'pluginConfig': {
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    HelloIonicPage,
    ProfilePage,
    ProfesionalsPage,
    RegisterPage,
    LogoutPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule,
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    HelloIonicPage,
    ProfilePage,
    ProfesionalsPage,
    RegisterPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProfileService,
    ProfesionalsService,
    ApiService,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
