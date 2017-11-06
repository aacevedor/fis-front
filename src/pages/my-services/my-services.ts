import { Component, OnInit } from '@angular/core';
import { Auth,
         User,
         UserDetails,
         IDetailedError } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { Platform, AlertController } from 'ionic-angular';
import { Service } from '../../class/profile';


@Component({
    selector: 'my-services',
    templateUrl: 'my-services.html',
})
export class MyServices implements OnInit{
  pageTitle: string;
  number: number;
  action: boolean;
  newService: Service;
  services: any;
  session: any;

  constructor(public api: ApiService,
              public user: User,
              public auth: Auth,
              public ctrlAlert: AlertController ){

  }


  ngOnInit(): void{
    this.pageTitle = 'Mis Servicios';
    this.action = false;

    console.log(this.newService);
    console.log(this.user);

  }

  addService(): void {
    this.action = true;
    this.newService = new Service();
    this.newService.user_id = 56;
  }

  saveService(): void{
      console.log( this.newService );
      this.api.createService(this.newService )
        .subscribe(
          successful => alert('Servicio guardado'),
          err        => console.log( err ),
          ()         => {
            this.api.confirmationProfesional( this.user.id )
            .subscribe(
              session => this.session = session[0],
              err     => console.log( err ),
              ()      =>  {
                      this.api.getProfesional( this.session.id )
                      .subscribe(
                          session => this.session = session,
                          err     => console.log(err),
                          ()      => {
                            Object.defineProperty(this.user.details, 'session',{ value: this.session, enumerable:true})
                          }
                      )
                      this.newService = new Service();
                   }
            )
          }
        );

      alert('Servicio guardado');
  }

}
