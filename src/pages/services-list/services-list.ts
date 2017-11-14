import { Component,
         OnInit,
       } from '@angular/core';
import { NavController,
         NavParams
       } from 'ionic-angular';
import { Auth,
         User,
   } from '@ionic/cloud-angular';
import { ApiService } from '../../api/api.services';
import { Service } from '../../class/profile';
import { LoginPage } from '../login/login';
import { detailPage } from '../index';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular'


@Component({
  selector: 'page-services-list',
   templateUrl: 'services-list.html'
})
export class ServicesListPage implements OnInit{
  pageTitle: string;
  services : Service[];
  loader: any;
  alert:  any;
  session: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiService,
              public user: User,
              public auth: Auth,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController
  ) {}

  ngOnInit(){
    if ( !this.auth.isAuthenticated() ) {
      this.navCtrl.push(LoginPage);
    }
    this.presentProcess('Cargando...');
    this.pageTitle = 'Servicios';
    this.getServices();
    this.verificateProfile();
  }


  getServices(): void {
    this.api.getServicesList()
    .subscribe(
      services => this.services = services,
      err => console.log(err),
      () => { this.loader.dismiss();}
    )
  }

  serviceDetail( service: Service ): void {
     this.navCtrl.push(detailPage, { 'service': service });
  }

  getService(service, id ):void {
    console.log(id);
    this.presentProcess('Enviando solicitud.')
    this.api.createServiceComfirm( service, id)
    .subscribe(
        success => {},
        err    => console.log(err),
        ()     => { this.loader.dismiss(); this.showAlert('Info','Solicitud enviada.')  }
    );
  }

  verificateProfile(): void{
    this.api.confirmationProfesional(this.user.id)
    .subscribe(
      profile => this.session = profile,
      err => console.log(err),
      () => {
            Object.defineProperty(this.user.details, 'session', {value:this.session, enumerable: true}) ;
          }
    );
  }

  presentProcess(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
      duration: 3000
    });
    this.loader.present();
  }

  showAlert(type,text){
    this.alert = this.alertCtrl.create({
      title: type,
      subTitle: text,
      buttons: ['OK']
    });

    this.alert.present();
  }


}
