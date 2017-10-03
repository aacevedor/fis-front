import {
  Component,
  OnInit,
} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoginPage } from '../index';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 //CameraPosition,
 MarkerOptions,
 //Marker
} from '@ionic-native/google-maps';
import { Profesional } from '../../class/profile';
import { ApiService } from '../../api/api.services';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage implements OnInit{

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private user: User,
              private auth: Auth
              ) {}

  ngOnInit(){
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }

}
