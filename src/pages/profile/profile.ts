import { Component,
         OnInit} from '@angular/core';
import { ApiService } from '../../api/api.services';
import { Auth,
         User,
         } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { ENV } from '../../config/env';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Profesional } from '../../class/profile';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  profile: Profesional;
  success: any;
  session: any;
  update: any;
  loader: any;
  alert:  any;
  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              public api: ApiService,
              public http:Http,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController
              ) {


              }

  ngOnInit(): void {
    this.userSync();
  }

  userSync():void {
    let data = {
      name: this.user.details.name,
      email: this.user.details.email,
      password:'p0p01234',
      ionic_id:this.user.id,
    }
    this.presentProcess('Cargando...');
    this.http.post( ENV.APP_BACKEND + '/api/users', data)
    .subscribe(
      success => this.success = success,
      err => console.log(err),
      () => this.getSession()
    );

  }

  //Get user login ingormation complete
  getSession(): void {
    this.api.confirmationProfesional( this.user.id )
    .subscribe(
      session => this.session = session,
      err     => console.log( err ),
      ()      => { this.loader.dismiss();}

    )
  }

  save(): void {
    this.presentProcess('Guardando...');
    this.api.createProfesionalProfile(  this.session.profile )
      .subscribe(
          result => this.update = result,
          err    => this.showAlert('Error','Error de conexion, intentelo nuevamente'),
          ()     => { this.loader.dismiss(); this.navCtrl.setRoot(HomePage);}
      );
  }

  changeRole(): void {
    this.presentProcess('Solicitando...');
    this.api.sendMail( {id:this.session.id, type:'changeRole' } )
      .subscribe(
        susses => {},
        err    => this.showAlert('Info','Se ha presentado un error, intentelo mas tarde.'),
        ()     => { this.loader.dismiss(); this.showAlert('Info','Solicitud enviada.') }
      )
  }

  detectRole( roles: Array<any>): Boolean{
    let exit = false;
    roles.forEach(function (val, index) {
        if( val.id === 2 ){ exit = true; }
    });
    return exit;
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
