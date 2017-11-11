import {
    Component,
    OnInit,
    AfterContentInit,
} from '@angular/core';
import { ApiService } from '../../api/api.services';
import { Authorization } from '../../class/profile';
import { Contracts, Service } from '../../class/profile';
import { Auth,
         User,
      } from '@ionic/cloud-angular';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../index';
import { AlertController } from 'ionic-angular'
import { HomePage } from '../home/home';



//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'my-contracts',
  templateUrl: 'my-contracts.html'
})
export class MyContracts implements OnInit, AfterContentInit{
  contracts: Contracts;
  session: any;
  alert:  any;
  service_cancel: Service;
  public authorization: Authorization;

  constructor(
              public api: ApiService,
               public user: User,
               public auth: Auth,
               public navCtrl:NavController,
               public ctrlAlert: AlertController,

               ) {}

  ngOnInit(): void{
    this.verificateProfile();
  }

  ngAfterContentInit(): void {

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

              if(this.session.services_confirm.length === 0){
                this.showAlert('Info', 'Aun no has contratado servicios');
              }
            }
          }
    );
  }


  cancelService(service): void {
    this.service_cancel = service;
    this.cancelAlert('Alerta','Desea continuar');
  }

  showAlert(type,text){
    this.alert = this.ctrlAlert.create({
      title: type,
      subTitle: text,
      buttons: [{
        text:'OK',
        handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });

    this.alert.present();
  }

  cancelAlert(type,text){
    this.alert = this.ctrlAlert.create({
      title: type,
      subTitle: text,
      buttons: [{
        text:'Cancelar',
        handler: () => {
        }
      },
      {
        text:'OK',
        handler: () => {
          this.service_cancel.status_id = 7; // servicio cancelado
          let params = {
              status_id: this.service_cancel.status_id
          }
          let id = this.service_cancel.id; 
          this.api.updateServiceConfirm(params, id)
          .subscribe(
            success => { console.log(success) },
            err     => console.log( err ),//this.showAlert('Error','Se ha presentado un error, intentelo nuevamente'),
            ()      => this.showAlert('Info','El servicio ha sido cancelado'),
          );
        }
      }]
    });
    this.alert.present();
  }


}
