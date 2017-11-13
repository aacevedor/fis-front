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
import { Geolocation } from '@ionic-native/geolocation';


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
  longitude: any;
  latitude: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public platform: Platform,
              private push: Push,
              public ctrlAlert: AlertController,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private geolocation:Geolocation) {}


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
    }else{this.navCtrl.push(LoginPage);}
  }

  getServices(): void {
    this.api.getServices()
    .subscribe(
      services => this.services = services,
      err => console.log(err),
      () => console.log('Servicios', this.services),
    )
  }

  getProfesionals(): void {
    this.api.getProfesionals()
    .subscribe(
      profesionals => this.profesionals = profesionals,
      err => console.log(err),
      () => console.log('Profesionales', this.profesionals)
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
            console.log('Usuario',this.user);
            this.initPushNotification();
            this.setGeolocalization(this.session.profile.id);
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

  setGeolocalization( id ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      //this.initAlert();
      let params = { geolocalization: '['+ this.latitude +','+ this.longitude +']' }
      this.api.setGeolocalization(params, id).subscribe(err => console.log(err) );

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  initPushNotification(){

    if( !this.platform.is('cordova')){ console.warn( "Cordova not found" ); return; }

    this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        this.token = t.token;
        let params = {
          user_id:this.session.id,
          ionic_token: this.token,
        }
        this.api.saveToken( params ).subscribe( err => console.log(err) );
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
      subTitle: 'longitude :'+ this.longitude +' - longitude' + this.latitude,
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
