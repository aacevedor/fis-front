import {
  Component,
  OnInit,
} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Profesional, ProfesionalProfile } from '../../class/profile';
import { ApiService } from '../../api/api.services';


@Component({
  selector: 'page-profesionals',
  templateUrl: 'profesionals.html'
})
export class ProfesionalsPage implements OnInit{
  map: GoogleMap;
  mapElement: HTMLElement;
  profesional: Profesional;
  profesionalProfile: ProfesionalProfile;
  ready: boolean;
  constructor(public navCtrl: NavController,
              private api: ApiService,
              private navParams: NavParams,
              private alert: AlertController,
              private googleMaps: GoogleMaps) {}

  ngOnInit(){
      this.profesional = this.navParams.get('profesional');
      //this.getProfesionalDetail();
      this.loadMap();
  }



  getProfesionalDetail(): void {
    this.api.getProfesional(this.profesional.id)
    .subscribe(
      ProfesionalProfile => this.profesionalProfile = ProfesionalProfile,
      err => { this.showAlert(err); },
      () => console.log( this.profesionalProfile ),
    );
  }

  showAlert(err): void {
    let alert = this.alert.create(
      {
        title:'No encontrado',
        subTitle:'Lo lamentamos, este perfil esta bloqueado',
        buttons: [
          {
            text: 'Aceptar',
            handler: data => {
               this.navCtrl.pop();
            }
          }
        ]
      }
    )
    alert.present();
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt:30
      }
    }

    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one( GoogleMapsEvent.MAP_READY )
      .then(
        () => {
            console.log('Map is ready');

            this.map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: 43.0741904,
                  lng: -89.3809802
                }
              })
              .then( marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
                });
              })
          }
      );

  }

}
