import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HelloIonicPage } from '../pages/detail/detail';
import { ProfilePage } from '../pages/profile/profile';
import { ProfesionalsPage } from '../pages/profesionals/profesionals';


import { HttpModule } from '@angular/http';

import { ProfileService } from '../app/app.services';
import { ProfesionalsService } from '../app/app.services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HelloIonicPage,
    ProfilePage,
    ProfesionalsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HelloIonicPage,
    ProfilePage,
    ProfesionalsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProfileService,
    ProfesionalsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
