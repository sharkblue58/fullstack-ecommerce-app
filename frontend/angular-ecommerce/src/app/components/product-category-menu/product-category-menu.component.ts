import { Component } from '@angular/core';
import { ProductCategory } from '../../commons/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {
   public productCategorys: ProductCategory[] = [];
   constructor(private productService: ProductService) {}

   ngOnInit() {
    this.listProductCategorys();
   }

   listProductCategorys() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product Categorys '+ JSON.stringify(data));
        this.productCategorys = data;
      }
    )
   }
}
