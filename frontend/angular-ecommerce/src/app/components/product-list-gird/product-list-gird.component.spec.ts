import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListGirdComponent } from './product-list-gird.component';

describe('ProductListGirdComponent', () => {
  let component: ProductListGirdComponent;
  let fixture: ComponentFixture<ProductListGirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListGirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
