import { Component,
        OnInit,
} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfesionalsService } from '../../app/app.services';

import { Profile } from '../../class/profile';

@Component({
  selector: 'page-profesionals',
  templateUrl: 'profesionals.html'
})
export class ProfesionalsPage implements OnInit{

  private profesionals: Profile;
  constructor(public navCtrl: NavController, private profesionalService: ProfesionalsService) {}

  ngOnInit(){
    this.profesionalService.getprofesionals()
    .subscribe(
      data => { this.profesionals = data },
      err  => { console.log(err) },
      ()   => { console.log( this.profesionals ) }
    )
  }

}
