import { Component, Input, OnInit } from '@angular/core';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { PoTableColumn } from '@po-ui/ng-components';
import { ProductService } from './../../../../shared/services/product.service';
import { SalesItemsService } from './../../shared/services/sales-items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit{
  @Input() items: SalesItems[] = [];
  columns: PoTableColumn[] = [];
  isLoading = true;

  constructor(protected productService: ProductService, protected salesItemsService: SalesItemsService) { }

  ngOnInit(): void {
    this.onInitTable();
  }

  onInitTable(): void {
    this.columns = this.getColumns();
    this.transformItemWithProductName();
  }

  getColumns(): PoTableColumn[] {
    return this.salesItemsService.getColumns();
  }

  transformItemWithProductName(): void {
    this.items.map(item => {
      this.productService.getById(item.productId)
      .subscribe(product => item.productName = product.description)
    })
    .map(() => this.isLoading = false);
  }
}
