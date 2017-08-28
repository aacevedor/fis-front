import {
    Component,
    OnInit,
    AfterContentInit
  } from '@angular/core';


import { ProfileService } from '../../app/app.services';
import { Authorization } from '../../class/profile';

//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, AfterContentInit{
  public authorization: Authorization;
  constructor( private profileService:ProfileService ) {}

  ngOnInit():void{
    this.profileService.getAuthorization()
    .subscribe(
      data => { this.authorization = data },
      err  => { console.log('Error')},
      ()   => { console.log(this.authorization) ;}
    );

  }

  ngAfterContentInit(): void {

  }



}
