import {
  Component,
  OnInit,
} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 //CameraPosition,
 MarkerOptions,
 //Marker
} from '@ionic-native/google-maps';
import { Profesional } from '../../class/profile';
import { ApiService } from '../../api/api.services';


@Component({
  selector: 'page-profesionals',
  templateUrl: 'profesionals.html'
})
export class ProfesionalsPage implements OnInit{
  map: GoogleMap;
  mapElement: HTMLElement;
  profesional: Profesional;
  ready: boolean;
  coordinates: Array<any>;
  constructor(public navCtrl: NavController,
              private api: ApiService,
              private navParams: NavParams,
              private alert: AlertController,
              private googleMaps: GoogleMaps,
              public platform: Platform) {}

  ngOnInit(){
      this.profesional = this.navParams.get('profesional');
      this.coordinates = this.profesional.geolocalization.split(',')
      //this.getProfesionalDetail();
      if( !this.platform.is('cordova')){
          console.warn( "Para iniciar el plugin de maps, se debe emplear un dispositivo virtual o real" );
          return;
      }
      this.loadMap();
  }



  /*getProfesionalDetail(): void {
    this.api.getProfesional(this.profesional)
    .subscribe(
      ProfesionalProfile => this.profesionalProfile = ProfesionalProfile,
      err => { this.showAlert(err); },
      () => console.log( this.profesionalProfile ),
    );
  }*/

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
          lat: this.coordinates[0].replace('[',''),
          lng: this.coordinates[1].replace(']','')
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
                title: this.profesional.first_name,
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: this.coordinates[0].replace('[',''),
                  lng: this.coordinates[1].replace(']','')
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
