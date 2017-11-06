import {
    Component,
    OnInit,
    AfterContentInit,
    Input,
  } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Platform, AlertController } from 'ionic-angular';

import { ValidationService } from '../../services/index';
import { Authorization } from '../../class/profile';
import { HomePage } from '../index';
import { RegisterPage } from '../register/register';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
//import { PROFILE } from '../../mocks/mock-profile';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, AfterContentInit{


  public authorization: Authorization;
  form: FormGroup;
  logout: boolean;
  token : any;
  constructor(private formBuilder:FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public user: User,
              public platform: Platform,
              public push: Push,
              public ctrlAlert: AlertController ) {}

  ngOnInit():void{

    if ( this.navParams.get('logout') ) {
      alert('Sesion cerrada correctamente');
    }

    if ( this.auth.isAuthenticated() ) {
      this.navCtrl.setRoot(HomePage);

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
          this.navCtrl.setRoot(HomePage);
        },
     (err: IDetailedError<any>) => {
        // Do something with err such as
        alert('usuario y contraseña no coinciden');
      });
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
