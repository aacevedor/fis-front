import { Component, OnInit } from '@angular/core';
import { Auth,
         User,
         } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { AlertController } from 'ionic-angular';
import { Service } from '../../class/profile';
import { NavController } from 'ionic-angular';
import { ProfilePage, detailPage } from '../index';






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
  alert: any;
  constructor(public api: ApiService,
              public user: User,
              public auth: Auth,
              public ctrlAlert: AlertController,
              public navCtrl: NavController,
              private alertCtrl: AlertController
             ){

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
          successful => {},
          err        => console.log( err ),
          ()         => { this.showAlert('Info', 'Servicio guardado.'); this.verificateProfile() }
        );
  }

  deleteService(service): void{

    this.deleteAlert('Info','¿Esta seguro?',service.id);

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

  deleteAlert(type,text, id){
    this.alert = this.alertCtrl.create({
      title: type,
      subTitle: text,
      buttons: [{
        text: 'Si',
        handler: () => {
          this.api.deleteService( id )
            .subscribe(
                  success => {console.log(success)},
                  err     => {console.log(err)},
                  ()      => { this.showAlert('Info', 'Servicio Eliminado');  this.verificateProfile()}
            )
          }
      },
      {
        text:'No',
      }]
    });
    this.alert.present();
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
