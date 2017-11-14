import { ENV } from '../config/env';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {


  constructor( private http:Http ){}

  getCountrys(): Observable<any> {
    return this.http.get(ENV.APP_BACKEND + '/api/countrys')
      .map(response => response.json())
  }

  getCountry( id: number ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/countrys/'+ id )
      .map( response => response.json )
  }
  getCitys(): Observable<any> {
    return this.http.get(ENV.APP_BACKEND + '/api/citys')
      .map(response => response.json())
  }

  getCity( id: number ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/citys/'+ id )
      .map( response => response.json )
  }

  getProfesionals(): Observable<any> {
    return this.http.get(ENV.APP_BACKEND + '/api/users-profile')
      .map(response => response.json())
  }

  getProfesionalsList(): Observable<any> {
    return this.http.get(ENV.APP_BACKEND + '/users-profile/provider')
      .map(response => response.json())
  }

  getProfesional( id: number ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/users/'+ id )
      .map( response => response.json() )
  }

  getProfesionalProfile(id: number): Observable<any>{
    return this.http.get( ENV.APP_BACKEND + '/api/user/'+ id )
      .map( response => response.json() )
  }

  getServices( ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/services' )
      .map( response => response.json() )
  }

  getServicesList( ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/services/all' )
      .map( response => response.json() )
  }

  getService(id: number ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/services/' + id )
      .map( response => response.json() )
  }

  getServicesTypes(): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/services-types/')
      .map( response => response.json )
  }

  getServicesType(id: number ): Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/services-types/' + id )
      .map( response => response.json() )
  }

  getServicesStatus(id: number) : Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/services-status/' + id )
      .map( response => response.json())
  }

  confirmationProfesional(id: string) : Observable<any> {
    return this.http.get( ENV.APP_BACKEND + '/api/user/confirmation/' + id )
      .map (response => response.json())
  }

  saveToken( params: any ): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(ENV.APP_BACKEND + '/api/push',  JSON.stringify( params ), {headers: headers} )
      .map(response => response.json);
  }

  setGeolocalization( params: any, id: number ): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put( ENV.APP_BACKEND + '/api/users-profile/' + id, JSON.stringify( params ), {headers: headers} )
      .map (response => response.json());
  }

  createProfesionalProfile( params: any ): Observable<any> {
    let id = params.id;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put( ENV.APP_BACKEND + '/api/users-profile/' + id, JSON.stringify( params ), {headers: headers} )
      .map (response => response.json());
  }



  sendMail(params : any ){
    return this.http.get(ENV.APP_BACKEND + '/api/notification/'+ params.type +'/'+ params.id )
      .map( response => response.json() );
  }

  createService( params: any ){
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(ENV.APP_BACKEND + '/api/services',  JSON.stringify( params ), {headers: headers} )
      .map(response => response.json);

  }

  deleteService(id: number ){
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete(ENV.APP_BACKEND + '/api/services/'+ id, {headers: headers} )
      .map(response => response.json);

  }


  createServiceComfirm(service:any, user_id: number) {
    let now = new Date();

    let data = {
      service_id: service.id,
      price: service.price,
      service_time: 1,
      total_price: service.price,
      request_date: now.toISOString().slice(0,19).replace('T',' '),
      delivery_date:'2017-11-07 10:52:53',
      status_id:1,
      user_id: user_id,
    }

    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(ENV.APP_BACKEND + '/api/services-confirm', JSON.stringify(data), {headers:headers} )
      .map(response => response.json())
  }


  updateServiceConfirm(params: any, service_confirm_id: number ){
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(params);
    return this.http.put( ENV.APP_BACKEND + '/api/services-confirm/' + service_confirm_id, JSON.stringify( params ), {headers: headers} )
       .map (response => response.json());
  }

  createComment(comment: any){
    let headers = new Headers( {'Content-Type': 'application/json'} );
    console.log(JSON.stringify(comment));
    return this.http.post( ENV.APP_BACKEND + '/api/services-comments', JSON.stringify(comment), {headers:headers} )
      .map( response => response.json() )
  }

}
