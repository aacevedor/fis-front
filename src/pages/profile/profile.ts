import { Component,
         OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              ) {}


ngOnInit(): void {
  console.log(this.user);
}



}
