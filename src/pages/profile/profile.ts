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
import {Validators, FormBuilder, FormGroup} from '@angular/forms';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  profile: Profesional;
  form: FormGroup;
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
              private alertCtrl: AlertController,
              private formBuilder:FormBuilder,
              ) {


              }

  ngOnInit(): void {
    this.userSync();
    this.form = this.formBuilder.group({
      first_name:['', Validators.required],
      last_name:['',Validators.required],
      description:['',Validators.required],
      city_id:['',Validators.required],
      gender:['',Validators.required],
      profession:['',Validators.required],
      address:['',Validators.required]
    });

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
      ()      => {
        console.log(this.session);
        this.form.controls.first_name.setValue( this.session.profile.first_name);
        this.form.controls.last_name.setValue( this.session.profile.last_name);
        this.form.controls.address.setValue( this.session.profile.address);
        this.form.controls.description.setValue( this.session.profile.description);
        this.form.controls.city_id.setValue( this.session.profile.city_id);
        this.form.controls.gender.setValue( this.session.profile.gender);
        this.form.controls.profession.setValue( this.session.profile.profession,  );
        this.loader.dismiss();}
    )
  }

  onSubmit(): void {
    this.session.profile.first_name = this.form.value.first_name;
    this.session.profile.last_name = this.form.value.last_name;
    this.session.profile.address = this.form.value.address;
    this.session.profile.description = this.form.value.description;
    this.session.profile.city_id = this.form.value.city_id;
    this.session.profile.gender = this.form.value.gender;
    this.session.profile.profession = this.form.value.profession;

    this.presentProcess('Guardando...');
    this.api.createProfesionalProfile(  this.session.profile )
      .subscribe(
          result => this.update = result,
          err    => this.showAlert('Error',''),
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
