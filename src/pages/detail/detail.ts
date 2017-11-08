import {
    Component,
    OnInit,
    AfterContentInit,

      } from '@angular/core';

import { Authorization } from '../../class/profile';

import { Service } from '../../class/profile';
import { NavParams } from 'ionic-angular';




//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class detailPage implements OnInit, AfterContentInit{

  public authorization: Authorization;
  service: Service;
  constructor( private navParams: NavParams,
               ) {}

  ngOnInit():void{
    this.service = this.navParams.get('service');
    console.log(this.service);

  }

  ngAfterContentInit(): void {

  }



}
