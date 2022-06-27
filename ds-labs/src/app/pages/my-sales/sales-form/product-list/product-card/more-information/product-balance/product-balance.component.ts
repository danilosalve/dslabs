import { Component, Input, OnInit } from '@angular/core';
import { ProductBalanceService } from '@app/shared/services/product-balance.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { finalize, tap } from 'rxjs/operators';
import { ProductBalance } from './../../../../../../../shared/interfaces/product-balance';

@Component({
  selector: 'app-product-balance',
  templateUrl: './product-balance.component.html'
})
export class ProductBalanceComponent implements OnInit {
  @Input() productId: string = '';
  @Input() productName: string = '';
  isLoading = false;
  productBalances: ProductBalance[] = [];
  isDisplayList = false;

  constructor(
    protected productBalance: ProductBalanceService,
    protected poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {}

  handleClickButton(): void {
    this.getProductBalance();
  }

  getProductBalance(): void {
    this.productBalance
      .getAll()
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (products) => {
          this.productBalances = products.filter(
            (p) => p.productId === this.productId
          ),
          this.isDisplayList = true;
        },
        error: () => this.poNotification.error('Falha ao Localizar produto'),
      });
  }
}
