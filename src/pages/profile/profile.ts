import { Component,
         OnInit} from '@angular/core';
import { ApiService } from '../../api/api.services';
import { NavController } from 'ionic-angular';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { ENV } from '../../config/env';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  profile: User;
  success: any;
  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              public api: ApiService,
              public http:Http,
              ) {}


ngOnInit(): void {
  console.log(this.user);
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
    () => console.log(this.success)
  );

}

getProfile():void {
  const id = 1
  this.api.getProfesional( id )
    .subscribe(
      profile => this.profile = profile,
      err   => console.log(err),
      ()  => console.log( this.profile ),
    )
}


}
