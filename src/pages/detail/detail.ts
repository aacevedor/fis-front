import {
    Component,
    OnInit,
    AfterContentInit,

      } from '@angular/core';
import { ProfileService } from '../../app/app.services';
import { Authorization } from '../../class/profile';
import { ApiService } from '../../api/api.services';
import { Service } from '../../class/profile';
import { NavController, NavParams } from 'ionic-angular';




//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class detailPage implements OnInit, AfterContentInit{

  public authorization: Authorization;
  service: Service;
  constructor( private profileService:ProfileService,
               private navParams: NavParams,
               ) {}

  ngOnInit():void{
    this.service = this.navParams.get('service');
    console.log(this.service);

  }

  ngAfterContentInit(): void {

  }



}
