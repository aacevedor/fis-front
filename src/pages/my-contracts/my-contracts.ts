import {
    Component,
    OnInit,
    AfterContentInit,
} from '@angular/core';
import { ApiService } from '../../api/api.services';
import { Authorization } from '../../class/profile';
import { Contracts } from '../../class/profile';
import { Auth,
         User,
      } from '@ionic/cloud-angular';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../index';



//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'my-contracts',
  templateUrl: 'my-contracts.html'
})
export class MyContracts implements OnInit, AfterContentInit{
  contracts: Contracts;
  session: any;
  public authorization: Authorization;

  constructor(
              public api: ApiService,
               public user: User,
               public auth: Auth,
               public navCtrl:NavController
               ) {}

  ngOnInit(): void{
    this.verificateProfile();
  }

  ngAfterContentInit(): void {

  }

  verificateProfile(): void{
    this.api.confirmationProfesional(this.user.id)
    .subscribe(
      profile => this.session = profile,
      err => console.log(err),
      () => {
            Object.defineProperty(this.user.details, 'session', {value:this.session, enumerable: true}) ;
            if( this.session === '404' ) {
              alert( 'Para una mejor experiencia por favor completa la información de tu perfil' )
              this.navCtrl.push(ProfilePage);
            }else{
              console.log(this.session);
            }
          }
    );
  }


}
