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
 //MarkerOptions,
 //Marker
} from '@ionic-native/google-maps';
//import { Profesional } from '../../class/profile';
import { LoadingController } from 'ionic-angular';




@Component({
  selector: 'page-profesionals',
  templateUrl: 'profesionals.html'
})
export class ProfesionalsPage implements OnInit{
  map: GoogleMap;
  mapElement: HTMLElement;
  profesional: any;
  ready: boolean;
  coordinates: Array<any>;
  loader: any;
  alert: any;
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private googleMaps: GoogleMaps,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController
             ) {}

  ngOnInit(){
      this.profesional = this.navParams.get('profesional');
      this.coordinates = this.profesional.profile.geolocalization.split(',')
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
