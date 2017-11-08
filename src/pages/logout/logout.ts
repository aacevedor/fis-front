import {
  Component,
  OnInit,
} from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '@ionic/cloud-angular';
import { LoginPage } from '../index';




@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage implements OnInit{

  constructor(public navCtrl: NavController,
              private auth: Auth
              ) {}

  ngOnInit(){
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }

}
