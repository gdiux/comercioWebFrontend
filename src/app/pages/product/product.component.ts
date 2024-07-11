import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { CarritoService } from 'src/app/services/carrito.service';

// SERIVES
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private productsService: ProductsService,
                private carritoService: CarritoService){

                  activatedRoute.params.subscribe( ({id}) => {

                    this.loadProduct(id);

                  })

                }

  ngOnInit(): void {
    
  }

  /** ================================================================
   *  LOAD PRODUCT ID
  ==================================================================== */
  public portada!: string;
  public product!: Product;
  public stock: any;
  loadProduct(id:string){

    this.productsService.loadProductID(id)
        .subscribe( ({product}) =>{

          this.portada = product.img[0].img;
          this.product = product;    
          
          this.stock = Array(product.inventory).fill(1).map((x,i)=>i);    

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /**======================================================================
   * ADD PRODUCT CART
  ===================================================================== */
  addProductCart(product: Product, qty: any){
    qty = Number(qty);
    this.carritoService.upCarrito(product, qty);
  }

}
