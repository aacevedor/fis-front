import { Component,
         OnInit,
         AfterViewInit,
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
import { Platform, AlertController } from 'ionic-angular'
import { Push, PushToken } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild(Nav) nav: Nav;

  pageTitle: string;
  pages: Array<{ title: string, component: any }>;

  profesionals : Profesional[];
  services : Service[];
  fristTime: boolean;
  session: any;
  token : any;
  loader: any;
  alert:  any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public platform: Platform,
              public push: Push,
              public ctrlAlert: AlertController,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController


  ) {}


  ngOnInit(){
    this.platform.ready().then(() => {
      this.pageTitle = 'Inicio';

    });

  }

  ngAfterViewInit(){
    if ( this.auth.isAuthenticated() ) {
          this.presentProcess('Cargando...');
          this.verificateProfile();
          this.getProfesionals();
          this.getServices();
          this.initPushNotification();

    }else{this.navCtrl.push(LoginPage);}
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
      () => console.log(this.profesionals)
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
            if( this.session === 404 || this.session.profile.description === '' ) {
              this.showAlert('Info', 'Para una mejor experiencia por favor completa la información de tu perfil' )
              this.navCtrl.push(ProfilePage);
            }
            console.log(this.user);
          }
    );
  }

  getService(service, id):void {
    this.presentProcess('Enviando solicitud.')
    this.api.createServiceComfirm( service, id)
    .subscribe(
        success => {},
        err    => console.log(err),
        ()     => { this.loader.dismiss(); this.showAlert('Info','Solicitud enviada.')  }
    );

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
      this.loader.dismiss();
    }


    initAlert() {
      let alert = this.ctrlAlert.create({
        title: '',
        subTitle: 'Token :'+ this.token,
        buttons: ['OK']
      });
      alert.present();
    }


    presentProcess(text) {
      this.loader = this.loadingCtrl.create({
        content: text,
        duration: 3000
      });
      this.loader.present();
    }

    showAlert(type,text){
      this.alert = this.alertCtrl.create({
        title: type,
        subTitle: text,
        buttons: ['OK']
      });

      this.alert.present();
    }

}
