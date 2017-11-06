import {
    Component,
    OnInit,
    AfterContentInit,

      } from '@angular/core';
import { ProfileService } from '../../app/app.services';
import { Authorization } from '../../class/profile';
import { ApiService } from '../../api/api.services';
import { Contracts } from '../../class/profile';
import { NavController, NavParams } from 'ionic-angular';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';



//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'my-contracts',
  templateUrl: 'my-contracts.html'
})
export class MyContracts implements OnInit, AfterContentInit{

  public authorization: Authorization;
  contracts: Contracts;
  constructor( private profileService:ProfileService,
               private navParams: NavParams,
               public user: User,
               public auth: Auth,
               ) {}

  ngOnInit(): void{
    console.log(this.user);
  }



  ngAfterContentInit(): void {

  }



}
