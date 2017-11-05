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


}
