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
  selector: 'page-services-list',
   templateUrl: 'services-list.html'
})
export class ServicesListPage implements OnInit{
  pageTitle: string;
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


    this.pageTitle = 'Servicios';
    this.getServices();
  }


  getServices(): void {
    this.api.getServices()
    .subscribe(
      services => this.services = services,
      err => console.log(err),
      () => console.log(this.services)
    )
  }


  serviceDetail( service: Service ): void {
     this.navCtrl.push(detailPage, { 'service': service });
  }
  
  getService():void {
    alert('servicio contratado');
  }

}
