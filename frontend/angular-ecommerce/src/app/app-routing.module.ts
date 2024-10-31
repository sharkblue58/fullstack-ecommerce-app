import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductListGirdComponent } from './components/product-list-gird/product-list-gird.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';


const routes: Routes = [
  {path:'category/:id',component:ProductListGirdComponent},
  {path:'search/:keyword',component:ProductListGirdComponent},
  {path:'product/:id',component:ProductDetailsComponent},
  {path:'category',component:ProductListGirdComponent},
  {path:'products',component:ProductListGirdComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }