import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../commons/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product: Product = {} as Product;
  theProductId: number = 1;

  constructor(private productService: ProductService,private route: ActivatedRoute) {}

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
}
