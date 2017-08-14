import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  public user: string;
  public password: string;
  public url: string;
  public token: string;
  public data: any;

  constructor( private http:Http ){}

  getAuthorization(): Observable<any> {
    const body = {
                    "client_id": 5,
                    "client_secret": "CEdFI9nlDHdhPmdyiSLvTUQODBLqet6D2xFgo9wi",
                    "grant_type": "password",
                    "username": "afernandoacevedo@unipanamericana.edu.co",
                    "password": "p0p01234",
                    "scope": ""
                };

    this.url = 'http://192.168.0.4:8000/oauth/token';
    return this.http.post(this.url, body)
          .map(response => response.json())

    }

}

@Injectable()
export class ProfesionalsService {
  public user: string;
  public password: string;
  public url: string;
  public token: string;
  public data: any;

  constructor( private http:Http ){}

  getprofesionals(): Observable<any> {
    let headers = new Headers;
    headers.set("Accept", 'application/json');
    headers.set("Authorization", 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMxN2RmM2NkMGQ0MzY0YzUyOTUxMDBkMDc2MTE5YjhiMjUxZDM3NDI5ODViZGMwMzU0NzM0NTdmMmNlY2MwY2JkNzEyNGY2YWQwMzI3OGM2In0.eyJhdWQiOiI1IiwianRpIjoiYzE3ZGYzY2QwZDQzNjRjNTI5NTEwMGQwNzYxMTliOGIyNTFkMzc0Mjk4NWJkYzAzNTQ3MzQ1N2YyY2VjYzBjYmQ3MTI0ZjZhZDAzMjc4YzYiLCJpYXQiOjE1MDI2NjU3OTksIm5iZiI6MTUwMjY2NTc5OSwiZXhwIjoxNTAzOTYxNzk5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LTy58zbiuva5tVL6nR4mtmS_ARe2LbNG3x6H0YE9A3ZWH7UbDAPJruXLYhvW9dSsEipdXOrlbxvXnyXcS2yMG5-2I1xA4anZhHZqNawIC0rLcTyIEdWIqO6q6AZnhrhC2dUdi1ob_jlon5bUej_lbsaXrkBdNXRCMERpSkIIXnOIS3LaVk6JqJ31N89sxhCeHeH4yrqtl7KNq76Ni83n_jxF1Tr2r0cN_Tu-Ut0bOonKL-UZUMYBWP2hBApdSxQRgNXBxS5K1dWvibIl4tg0_SQDjiQTCxozde1gGerPBrDtulHn-G0pgYMIAi7Ycy7po12tm2djG1bkYy2GYPCBafOk084mNbXSmRsccZLVMk2Lt6NV7zdecnQ2V2qSgsnjiN8u4mMveboKAZXyctHxuwm092ZepRz1QqncuURclO4pxegRM75dY31BoGlgtfNeFOLmxUI6Rlu9OpystnB9xbOl3OnXSkt0bwQW1cSNm5Q3iCuSo9F95okngNPrqAFi5J_7CXwbDsvRnMS3mwJJW2RnHjw1MTYuspuZ1MFj5YngKzZzmMm2JtclO6XU6Th29a5oQIhbztTjSLqvT9Jyhbb6tbpYmq4-Yt9icSEQuFcSYnmItdF0Qjv0zUBG0dEkAMTtXGJwUkiC4g0BIs2bJa2cKvBB9ItCDRMCfVFY6VM');

    this.url = 'http://192.168.0.4:8000/api/users';
    return this.http.get(this.url, { headers: headers })
          .map(response => response.json())

    }

}
