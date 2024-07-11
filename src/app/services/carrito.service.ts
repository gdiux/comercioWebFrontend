import { Injectable } from '@angular/core';
import { Carrito } from '../interfaces/carrito.interface';
import { Product } from '../models/products.model';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public cart: Carrito = {
    items: [],
    total: 0
  };

  constructor( ) { }

  /** ================================================================
   *  DEL CART
  ==================================================================== */
  deleteCart(){

    this.cart = {
      items: [],
      total: 0
    }

    localStorage.removeItem('cart');

  }

  /** ================================================================
   *  GET CART
  ==================================================================== */
  getCartLocal(){

    if (localStorage.getItem('cart') !== null) {
      let carrito: any = JSON.parse(localStorage.getItem('cart')!);
      for (const item of carrito['items']) {
        this.cart.items.push(item);
      }

      this.cart.total = Number(carrito['total']);
    }

  }

  /** ================================================================
   *  TOTALES
  ==================================================================== */
  sumarTotales(){

    let total = 0;

    for (const item of this.cart.items) {      
      total = total + (item.qty * item.price);
    }

    this.cart.total = total;

    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  /** ================================================================
   *  GET CARRITO
  ==================================================================== */
  upCarrito(product: Product, qty: number){  

    let precio = product.price;

    if (product.offert) {
      precio = product.offertPrice;
    }

    const validarItem = this.cart.items.findIndex( (item) => {
      if (item.product.sku === product.sku) {
        return true;
      }else{
        return false;
      }
    });

    // AGREGAMOS A LA LISTA DE ITEMS
    if (validarItem === -1) {
      
      this.cart.items.push({
        product,
        qty,
        price: precio
      })
    }else{
      this.cart.items.map( (item) => {
        if (item.product.sku === product.sku) {
          item.qty = (item.qty + qty)

          if (item.qty > product.inventory) {
            item.qty = product.inventory;
          }

        }
      })
    }

    // this.cart.total = this.cart.total + Number(qty * product.price); 
    this.sumarTotales();

  }

  /** ================================================================
   *  DEL ITEM CARRITO
  ==================================================================== */
  delItemCart(i: any){

    this.cart.items.splice(i,1);
    this.sumarTotales();

  }

  // FIN DE LA CLASE

}
