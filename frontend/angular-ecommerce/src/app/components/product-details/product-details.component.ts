import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../commons/product';
import { CartItem } from '../../commons/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {


  product: Product= new Product();
  theProductId: number = 1;

  constructor(private productService: ProductService,private cartService : CartService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    this.theProductId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(this.theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
        console.log("Adding to cart: " + this.product.name + " " + this.product.unitPrice);
        const cartItem = new CartItem(this.product);
        this.cartService.addToCart(cartItem);
    }
}
