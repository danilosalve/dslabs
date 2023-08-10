import { Component } from '@angular/core';
import { Product } from '@app/pages/my-products/shared/interface/product';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { PoListViewAction } from '@po-ui/ng-components';

interface IColorGroup {
  Frutas?: string;
  Legumes?: string;
  Verduras?: string;
}

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html'
})
export class ProductListViewComponent extends BaseResourceListView<Product> {
  readonly colorGroup: IColorGroup = {
    Frutas: 'color-08',
    Legumes: 'color-07',
    Verduras: 'color-09'
  }

  getActions(): PoListViewAction[] {
    return [];
  }

  getColorGroup(key: keyof IColorGroup): string {
    return this.colorGroup[key] ?? 'color-02';
  }

  getPhotoSRC(file: string ): string {
    return `assets/img/products/${file}`;
  }

}
