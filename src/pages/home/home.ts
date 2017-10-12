import { Component,
         OnInit,
       } from '@angular/core';
import { NavController,
         NavParams
       } from 'ionic-angular';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { Profesional, Service } from '../../class/profile';
import { LoginPage } from '../login/login';
import { ProfesionalsPage } from '../index';
import { detailPage, ProfilePage } from '../index';
import { Injectable } from '@angular/core';



@Component({
  selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  pageTitle: string;
  profesionals : Profesional[];
  services : Service[];
  fristTime: boolean;
  userProfile: any;
  session: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
  ) {}


  ngOnInit(){
    this.pageTitle = 'Inicio';
    if ( !this.auth.isAuthenticated() ) {
          this.navCtrl.push(LoginPage);
        }
    this.verificateProfile();
    this.getProfesionals();
    this.getServices();
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
      profile => this.userProfile = profile,
      err => console.log(err),
      () => {
            if( this.userProfile.length === 0 ) {
              alert( 'Para una mejor experiencia por favor completa la información de tu perfil' )
              this.navCtrl.push(ProfilePage);
            }else{
              this.session = this.userProfile;
            }
          }
    );
  }

  getService():void {
    alert('servicio contratado');
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
