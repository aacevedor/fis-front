import { Component,
         OnInit} from '@angular/core';
import { ApiService } from '../../api/api.services';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { ENV } from '../../config/env';
import { NavController , NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Profesional } from '../../class/profile';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  profile: Profesional;
  success: any;
  session: any;
  update: any;

  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              public api: ApiService,
              public http:Http,
              ) {}


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
    session => this.session = session[0],
    err     => console.log( err ),
    ()      =>  {
            this.api.getProfesional( this.session.id )
            .subscribe(
                session => this.session = session,
                err     => console.log(err),
                ()      => {
                    console.log(this.session);
                }
            )
         }
  )
}

save(): void {
  this.api.createProfesionalProfile(  this.session.profile )
    .subscribe(
        result => this.update = result,
        err    => console.log(err),
        ()     => {
          console.log(this.update);
          alert('Perfil guardado con exito');
          this.navCtrl.setRoot(HomePage);
        }
    );
}

changeRole(): void {
  this.api.sendMail( {id:this.session.id, type:'changeRole' } )
    .subscribe(
      susses => alert('Solicitud enviada'),
      err    => console.log(err),
    )
}

detectRole( roles: Array<any>): Boolean{
  let exit = false;
  roles.forEach(function (val, index) {
      if( val.id === 3 ){ exit = true; }
  });
  return exit;
}



}
