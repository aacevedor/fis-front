import {
    Component,
    OnInit,
    AfterContentInit,
    Input,
  } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ValidationService } from '../../services/index';
import { Authorization } from '../../class/profile';
import { HomePage } from '../index';

import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
//import { PROFILE } from '../../mocks/mock-profile';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, AfterContentInit{


  public authorization: Authorization;
  user: FormGroup;

  constructor(private formBuilder:FormBuilder,  public navCtrl: NavController ) {}

  ngOnInit():void{
    this.user = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      password:['',Validators.required],
    })
  }

  ngAfterContentInit(): void {

  }

  onSubmit() {
   console.log(this.user.value);  // { first: '', last: '' }
   this.navCtrl.push(HomePage);
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
