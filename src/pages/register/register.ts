import {
    Component,
  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth,
  User,
  UserDetails,
  IDetailedError } from '@ionic/cloud-angular';
import { Authorization } from '../../class/profile';
import { LoginPage } from '../index';
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
          alert('Tu registro a sido exitoso, por favor inicia sesion'),
          this.navCtrl.push(LoginPage);
      },
      (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          for (let e of err.details) {
            if ( e === 'conflict_username') {
              alert('Apodo ya existe');
            }
            if (e === 'conflict_email') {
              alert('Email ya existe');
            }
            if ( e === 'invalid_email') {
              alert('El correo no es valido');
            }
            if ( e === 'required_email') {
              alert('El correo es obligatorio');
            }
            if ( e === 'required_password') {
              alert('La contraseña es obligatoria');
            }
          }
        }
      });
    }
}
