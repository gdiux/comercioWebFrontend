import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

// import Swiper core and required modules
import SwiperCore, { EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css']
})
export class ProductsSliderComponent implements OnInit {

  @Input('params') params!: any;

  constructor(  private productsService: ProductsService,
                private carritoService: CarritoService){}

  ngOnInit(): void {
    this.search();
  }

  /**======================================================================
   * SEARCHS
  ===================================================================== */
  public products: Product[] = [];
  search(){

    let query: any = {
      sort: {},
      desde: 0,
      hasta: 10,
      inventory: { $gte: 1, $lt: 10000000 }
    };
    
    switch (this.params.search) {
      case 'vendidos':

        query = {
          sort:{ 'sold': -1 },
          desde: 0,
          hasta: 10,
          inventory: { $gte: 1, $lt: 10000000 }
        }
        
        break;

      case 'nuevos':
        query = {
          sort:{ 'date': -1 },
          desde: 0,
          hasta: 10,
          inventory: { $gte: 1, $lt: 10000000 }
        }
        
        break;

      case 'ofertas':
        query = {
          desde: 0,
          hasta: 10,
          inventory: { $gte: 1, $lt: 10000000 },
          offert: true
        }
          
          break;
    
      default:
        break;
    }


    this.productsService.loadProducts(query)
        .subscribe( ({products}) => {

          this.products = products;   

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /**======================================================================
   * ADD PRODUCT CART
  ===================================================================== */
  addProductCart(product: Product, qty: number){
    this.carritoService.upCarrito(product, qty);
  }


  /**======================================================================
   * SWIPER
  ===================================================================== */
  public config = {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
        990: {
            slidesPerView: 5,
            spaceBetween: 20
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40
      }
    },
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };

}
