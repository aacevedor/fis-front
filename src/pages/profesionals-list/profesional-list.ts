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
import { detailPage } from '../index';

@Component({
  selector: 'page-profesional-list',
   templateUrl: 'profesional-list.html'
})
export class ProfesionalsListPage implements OnInit{
  pageTitle: string;
  profesionals : Profesional[];
  services : Service[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
  ) {}


  ngOnInit(){

    if ( !this.auth.isAuthenticated() ) {
      this.navCtrl.push(LoginPage);
    }

    this.pageTitle = 'Lista de profesionales';
    this.getProfesionals();
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

}
