import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/index'
import {
 GoogleMaps,
// GoogleMap,
// GoogleMapsEvent,
 // GoogleMapOptions,
 // CameraPosition,
 // MarkerOptions,
 // Marker
} from '@ionic-native/google-maps';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/index';
import { detailPage } from '../pages/index';
import { ProfilePage } from '../pages/index';
import { ProfesionalsPage } from '../pages/index';
import { ProfesionalsListPage, ServicesListPage } from '../pages/index';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { MyServices } from '../pages/my-services/my-services';
import { ProfileService } from '../app/app.services';
import { ProfesionalsService } from '../app/app.services';
import { ApiService } from '../api/api.services';
import { MyContracts } from  '../pages/my-contracts/my-contracts';
import { ContractsList } from  '../pages/contracts/contracts';


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
    detailPage,
    ProfilePage,
    ProfesionalsPage,
    RegisterPage,
    LogoutPage,
    ProfesionalsListPage,
    ServicesListPage,
    MyServices,
    MyContracts,
    ContractsList
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
    detailPage,
    ProfilePage,
    ProfesionalsPage,
    RegisterPage,
    LogoutPage,
    ProfesionalsListPage,
    ServicesListPage,
    MyServices,
    MyContracts,
    ContractsList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProfileService,
    ProfesionalsService,
    ApiService,
    GoogleMaps,
    BackgroundMode,
    Push,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
