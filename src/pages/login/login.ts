import {
    Component,
    OnInit,
    AfterContentInit,
    Input,
  } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { ValidationService } from '../../services/index';
import { Authorization } from '../../class/profile';
import { HomePage } from '../index';
import { RegisterPage } from '../register/register';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, AfterContentInit{


  public authorization: Authorization;
  form: FormGroup;
  logout: boolean;
  constructor(private formBuilder:FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public user: User ) {}

  ngOnInit():void{

    if ( this.navParams.get('logout') ) {
      alert('Sesion cerrada correctamente');
    }

    if ( this.auth.isAuthenticated() ) {
      this.navCtrl.push(HomePage);
    }

    this.form = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      password:['',Validators.required],
    })
  }

  ngAfterContentInit(): void {

  }

  register(): void{
    this.navCtrl.push(RegisterPage);
  }

  onSubmit() {
   this.auth.login('basic',this.form.value)
     .then(
        () => {
          console.log(this.user);
          this.navCtrl.push(HomePage);
        }
     );
   }

}


@Component({
  selector:'control-messages',
  template:'<div *ngIf="errorMessages !== null">{{ errorMessage }}</div>'
})
export class ControlMessages{
  errorMessage: string;
  @Input() control: FormControl;
  constructor(){}


  get errorMessages() {
    for(let propertyName in this.control.errors ){
      if(this.control.errors.hasProperty(propertyName) && this.control.touched ){
        return ValidationService.getValidatorsErrorMessage( propertyName, this.control.errors[propertyName])
      }
    }

    return null
  }


}
