import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../commons/product';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../commons/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private http: HttpClient) {}

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseURL}/${theProductId}`;
    return this.http.get<Product>(productUrl);
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseURL}/search/findByCategoryId?id=${categoryId}`+`&page=${page}&size=${pageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProductsPaginate(keyword: string, page: number, pageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseURL}/search/findByNameContaining?name=${keyword}`+`&page=${page}&size=${pageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseURL}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
