import {
    Component,
  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth,
  User,
  UserDetails,
  IDetailedError } from '@ionic/cloud-angular';
import { Authorization } from '../../class/profile';
import { HomePage } from '../index';
import {Validators,
  FormBuilder,
  FormGroup} from '@angular/forms';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

  public authorization: Authorization;
  form: FormGroup;

  constructor(private formBuilder:FormBuilder,
              public navCtrl: NavController,
              public auth: Auth,
              public user: User ) {}

    ngOnInit():void{
      this.form = this.formBuilder.group({
        name:[''],
        email:['', [Validators.email, Validators.required]],
        username:[''],
        password:['',Validators.required],
      })
    }

    onSubmit() {
     let details: UserDetails = this.form.value;
     this.auth.signup(details)
      .then(() => {
          this.navCtrl.push(HomePage);
      },
      (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('La dirección de correo ya existe.');
          }
          else if( e === 'invalid_email'){
            alert('Por favor suministre un email valido');
          }
          else {
            alert('Hubo un error por favor intentelo mas tarde');
          }
        }
      });
    }
}
