import {
  Component,
  OnInit,
} from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '@ionic/cloud-angular';
import { LoginPage } from '../index';
import { BackgroundMode } from '@ionic-native/background-mode';





@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage implements OnInit{

  constructor(public navCtrl: NavController,
              private auth: Auth,
              private backgroundMode: BackgroundMode

              ) {}

  ngOnInit(){

    if(this.backgroundMode.isActive()){
        this.backgroundMode.disable();
    }
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }

}
