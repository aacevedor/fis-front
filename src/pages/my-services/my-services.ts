import { Component, OnInit } from '@angular/core';
import { Auth,
         User,
         } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import {  AlertController } from 'ionic-angular';
import { Service } from '../../class/profile';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../index';




@Component({
    selector: 'my-services',
    templateUrl: 'my-services.html',
})
export class MyServices implements OnInit{
  pageTitle: string;
  number: number;
  action: boolean;
  newService: Service;
  services: any;
  session: any;

  constructor(public api: ApiService,
              public user: User,
              public auth: Auth,
              public ctrlAlert: AlertController,
              public navCtrl: NavController ){

  }


  ngOnInit(): void{
    this.pageTitle = 'Mis Servicios';
    this.action = false;
    this.verificateProfile();

  }

  addService(): void {
    this.action = true;
  }

  saveService(): void{
      this.api.createService(this.newService )
        .subscribe(
          successful => alert('Servicio guardado'),
          err        => console.log( err ),
          ()         => { this.verificateProfile() }
        );

      alert('Servicio guardado');
  }


  verificateProfile(): void{
    this.api.confirmationProfesional(this.user.id)
    .subscribe(
      profile => this.session = profile,
      err => console.log(err),
      () => {
            Object.defineProperty(this.user.details, 'session', { value: this.session, enumerable: true}) ;
            if( this.session === '404' ) {
              alert( 'Para una mejor experiencia por favor completa la información de tu perfil' )
              this.navCtrl.push(ProfilePage);
            }else{
              this.newService = new Service();
              this.newService.user_id = this.session.id;

            }
          }
    );
  }

}
