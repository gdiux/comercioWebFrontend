import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { User } from 'src/app/models/user.model';

import { Carrito } from 'src/app/interfaces/carrito.interface';

import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';

interface _carrito{
  items: any[],
  total: number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  public carrito!: _carrito;
  public user!: User;
  public login: boolean = false;

  constructor(  private carritoService: CarritoService,
                private router: Router,
                private userService: UserService  ){
      this.carrito = carritoService.cart;
      this.user = userService.user;
      this.login = userService.isLogin;
  }

  ngOnInit(): void {

    // LOAD WORKER
    this.cargarUser();

    this.carritoService.getCartLocal();

  }

  /** ================================================================
   *  CARGAR WORKER
  ==================================================================== */
  cargarUser(){

    if (!localStorage.getItem('token')) {
      this.login = false;
      return;
    }else{
      this.login = true;
      this.userService.validateToken()
      .subscribe( resp => {
        
        if (resp) {
          this.user = this.userService.user;         
          
        }else{

          localStorage.removeItem('token');
          window.location.reload();
          this.login = false;
        }        

      });
    }

  }

  /** ================================================================
   *  DEL ITEM CARRITO
  ==================================================================== */
  delItem(i: any){
    this.carritoService.delItemCart(i);
  }

  /** ================================================================
   *  SEARCH PRODUCT
  ==================================================================== */
  search(termino: string){

    this.router.navigateByUrl(`/search/producto/${termino}`)

  }

  /** ================================================================
   *  LOGOUT
  ==================================================================== */
  logout(){ 
    this.login = false;
    this.userService.logout();
  }

  // FIN DE LA CLASE
}
