import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../models/user.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;
  public isLogin: boolean = false;

  constructor(  private http: HttpClient,
                private router: Router) { }
  
  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   LOGOUT
  ==================================================================== */
  logout(){
    
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');

  }

  /** ================================================================
   *  LOGIN
  ==================================================================== */
  login( formData: any ){
    
    return this.http.post(`${base_url}/login/user`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);
                          this.isLogin = true;
                          
                        }),
                        catchError( error => of(false) )
                      );
  }

  /** ================================================================
   *   RECUPERAR PASSWORD
  ==================================================================== */
  recuperarPassword( formData: any ){
    return this.http.post(`${base_url}/login/recuperar/password`, formData);
  }  

  /** ================================================================
   *   VALIDATE TOKEN OR RENEW TOKEN
  ==================================================================== */
  validateToken():Observable<boolean>{
    
    return this.http.get(`${base_url}/login/user/renew`, this.headers)
    .pipe(
      tap( (resp: any) => {

        const { name, lastname, cedula, phone, email, address, city, department, referralCode, referredBy, walletBalance, status, cid, fecha} = resp.usuario;

        this.user = new User( name, lastname, cedula, phone, email, '***', address, city, department, 'party_type', referralCode, referredBy, walletBalance, status, fecha, cid );        

        localStorage.setItem('token', resp.token);
        this.isLogin = true;

      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  /** ================================================================
   *   REGISTER
  ==================================================================== */
  register(formData: any){
    return this.http.post<{ok: boolean, client: User}>(`${base_url}/clients/web`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                    this.isLogin = true;
                    this.validateToken();
                  }),
                  catchError( error => of(false) )
                );
  }

  /** ================================================================
   *  UPDATE USER
  ==================================================================== */
  updateUser( formData: any, id: string ){
    return this.http.put< { client: User, ok: boolean } >(`${base_url}/clients/web/${id}`, formData, this.headers);
  }

  /** ================================================================
   *   LOAD LEVELS
  ==================================================================== */
  loadLevelsUser(cid: string){
    return this.http.get<{ok: boolean, first: User[], two: User[], three: User[], four: User[]}>( `${base_url}/clients/level/${cid}`, this.headers );
  }

  


  // FIN DE LA CLASE
}
