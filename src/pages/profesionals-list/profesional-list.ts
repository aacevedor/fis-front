import { Component,
         OnInit,
       } from '@angular/core';
import { NavController,
         NavParams
       } from 'ionic-angular';
import { Auth,
         User,
          } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { Profesional, Service } from '../../class/profile';
import { LoginPage } from '../login/login';
import { ProfesionalsPage } from '../index';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';




@Component({
  selector: 'page-profesional-list',
   templateUrl: 'profesional-list.html'
})
export class ProfesionalsListPage implements OnInit{
  pageTitle: string;
  profesionals : Profesional[];
  services : Service[];
  loader: any;
  alert: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController
  ) {}


  ngOnInit(){

    if ( !this.auth.isAuthenticated() ) {
      this.navCtrl.push(LoginPage);
    }

    this.pageTitle = 'Lista de profesionales';
    this.getProfesionals();
  }
  getProfesionals(): void {
    this.presentProcess('Cargando...')
    this.api.getProfesionalsList()
    .subscribe(
      profesionals => this.profesionals = profesionals,
      err => this.showAlert('Error','Error de conexion.'),
      () => { console.log(this.profesionals); this.loader.dismiss() }
    )
  }

  profesionalDetail( profesional: Profesional ): void {
     this.navCtrl.push(ProfesionalsPage, { 'profesional': profesional });
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
