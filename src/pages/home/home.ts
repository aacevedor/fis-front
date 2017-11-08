import { Component,
         OnInit,
         ViewChild
       } from '@angular/core';
import { NavController,
         NavParams,
         Nav
       } from 'ionic-angular';

import { Auth,
         User,
       } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { Profesional, Service } from '../../class/profile';
import { LoginPage } from '../login/login';
import { ProfesionalsPage } from '../index';
import { detailPage, ProfilePage } from '../index';
import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';




@Component({
  selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Nav) nav: Nav;

  pageTitle: string;
  pages: Array<{ title: string, component: any }>;

  profesionals : Profesional[];
  services : Service[];
  fristTime: boolean;
  session: any;
  token : any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public platform: Platform,
              public push: Push,
              public ctrlAlert: AlertController
  ) {}


  ngOnInit(){

    this.platform.ready().then(() => {
      this.pageTitle = 'Inicio';
      this.pages = [ { title: 'adasdasdasdasdas', component: HomePage } ]
      if ( this.auth.isAuthenticated() ) {
            this.verificateProfile();
            this.getProfesionals();
            this.getServices();
            this.initPushNotification();
      }else{this.navCtrl.push(LoginPage);}
    });


  }


  getServices(): void {
    this.api.getServices()
    .subscribe(
      services => this.services = services,
      err => console.log(err),
      /*() => console.log(this.services)*/
    )
  }

  getProfesionals(): void {
    this.api.getProfesionals()
    .subscribe(
      profesionals => this.profesionals = profesionals,
      err => console.log(err),
      /*() => console.log(this.profesionals)*/
    )
  }

  profesionalDetail( profesional: Profesional ): void {
     this.navCtrl.push(ProfesionalsPage, { 'profesional': profesional });
  }

  serviceDetail( service: Service ): void {
     this.navCtrl.push(detailPage, { 'service': service });
  }

  verificateProfile(): void{
    this.api.confirmationProfesional(this.user.id)
    .subscribe(
      profile => this.session = profile,
      err => console.log(err),
      () => {
            Object.defineProperty(this.user.details, 'session', {value:this.session, enumerable: true}) ;
            if( this.session === '404' ) {
              alert( 'Para una mejor experiencia por favor completa la información de tu perfil' )
              this.navCtrl.push(ProfilePage);
            }else{

              console.log(this.session);

            }
          }
    );
  }

  getService(service, id):void {
    this.api.createServiceComfirm( service, id)
    .subscribe(
        success => alert('Procesando solicitud'),
        err    => console.log(err),
    );
    alert('Servicio contratado');
  }

  initPushNotification(){
      if( !this.platform.is('cordova')){
          console.warn( "Para iniciar el plugin de notificaciones push, se debe emplear un dispositivo virtual o real" );
          return;
      }

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
        this.token = t.token;
        //this.initAlert();
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

}

@Injectable()
export class SessionService {
  session: any;
  constructor(public api: ApiService,
              public user: User,
              public auth: Auth) { }

  getSession():void {
    this.api.confirmationProfesional( this.user.id )
    .subscribe(
      session => this.session = session,
      err     => console.log(err),
    );
  }
}
