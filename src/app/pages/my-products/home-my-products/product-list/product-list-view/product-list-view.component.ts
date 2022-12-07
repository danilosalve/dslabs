import { Component } from '@angular/core';
import { Product } from '@app/pages/my-products/shared/interface/product';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { PoListViewAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html'
})
export class ProductListViewComponent extends BaseResourceListView<Product> {

  constructor() {
    super();
  }

  getActions(): PoListViewAction[] {
    return [];
  }


  getColorGroup(status: string): string {
    switch (status){
      case 'Frutas':
        return 'color-08'
      case 'Legumes':
        return 'color-07'
      case 'Verduras':
        return 'color-09'
      default:
        return 'color-02'
    }
  }

  getPhotoSRC(file: string ): string {
    return `assets/img/products/${file}`;
  }

}
