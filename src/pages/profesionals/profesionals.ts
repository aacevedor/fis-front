import { Component,
         OnInit,
        } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Profesional, ProfesionalProfile } from '../../class/profile';
import { ApiService } from '../../api/api.services';


@Component({
  selector: 'page-profesionals',
  templateUrl: 'profesionals.html'
})
export class ProfesionalsPage implements OnInit{
  profesional: Profesional;
  profesionalProfile: ProfesionalProfile;
  ready: boolean;
  constructor(public navCtrl: NavController,
              private api: ApiService,
              private navParams: NavParams,
              private alert: AlertController) {}

  ngOnInit(){
      this.profesional = this.navParams.get('profesional');
      this.getProfesionalDetail();
  }


  getProfesionalDetail(): void {
    this.api.getProfesional(this.profesional.id)
    .subscribe(
      ProfesionalProfile => this.profesionalProfile = ProfesionalProfile,
      err => { this.showAlert(err); },
      () => console.log( this.profesionalProfile ),
    );
  }

  showAlert(err): void {
    let alert = this.alert.create(
      {
        title:'No encontrado',
        subTitle:'Lo lamentamos, este perfil esta bloqueado',
        buttons: [
          {
            text: 'Aceptar',
            handler: data => {
               this.navCtrl.pop();
            }
          }
        ]
      }
    )
    alert.present();
  }

}
