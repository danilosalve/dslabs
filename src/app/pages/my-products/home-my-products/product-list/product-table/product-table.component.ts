import { Component, Injector } from '@angular/core';
import { Product } from '@app/pages/my-products/shared/interface/product';
import { ProductService } from '@app/pages/my-products/shared/services/product.service';
import { BaseResourceTable } from '@app/shared/components/base/base-resource-table.component';
import { PoTableAction, PoTableRowTemplateArrowDirection } from '@po-ui/ng-components';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html'
})
export class ProductTableComponent extends BaseResourceTable<Product> {
  templateDirection = PoTableRowTemplateArrowDirection.Left;
  constructor(
    protected productService: ProductService,
    protected override injector: Injector
  ) {
    super(injector, productService);
  }

  getActions(): PoTableAction[] {
    return [];
  }

  getPhotoSRC(product: Product): string {
    return `assets/img/products/${product.photo}`;
  }
}
