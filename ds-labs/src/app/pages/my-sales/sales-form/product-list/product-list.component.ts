import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductService } from './../../../../shared/services/product.service';
import { SalesItems } from './../../shared/interfaces/sales-items';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy {
  @Output() changeItems = new EventEmitter();
  items: SalesItems[] = [];
  selectedItem: SalesItems[] = [];
  product$ = new Subscription();
  isProductNotFound = false;
  itemId = 0;

  constructor(
    protected productService: ProductService,
    protected poNotification: PoNotificationService
  ) {}

  ngOnDestroy(): void {
    this.product$.unsubscribe();
  }

  onSearchProducts(search: string): void {
    this.product$ = this.productService
      .getAll()
      .pipe(
        tap(() => {
          this.items = [];
          this.isProductNotFound = false;
        }),
        map(products =>
          products.map(product => ({
            id: 0,
            salesId: 0,
            itemId: 0,
            productId: product.id,
            productName: product.description,
            value: product.price,
            quantity: 0,
            amount: 0,
            discount: 0
          }))
        )
      )
      .subscribe({
        next: products => {
          if (search) {
            const items = products.filter(
              p =>
                p.productId.includes(search) ||
                p.productName.toLowerCase().includes(search.toLocaleLowerCase())
            );
            if (items.length > 0) {
              this.items = items as unknown as SalesItems[];
            } else {
              this.isProductNotFound = true;
            }
          }
        },
        error: () => this.poNotification.error('Falha ao localizar produto')
      });
  }

  isEmpty(obj: any): boolean {
    if (Object.entries(obj).length === 0) {
      return true;
    }
    return false;
  }

  addItem(item: SalesItems): void {
    this.itemId++;
    item.itemId = this.itemId;
    this.selectedItem.push(item);
    this.changeItems.emit(item);
  }
}
