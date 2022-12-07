import { Component, Input } from '@angular/core';
import { ProductBalanceService } from '@app/shared/services/product-balance.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { finalize, take, tap } from 'rxjs/operators';
import { ProductBalance } from './../../../../../../../shared/interfaces/product-balance';

@Component({
  selector: 'app-product-balance',
  templateUrl: './product-balance.component.html'
})
export class ProductBalanceComponent {
  @Input() productId: string = '';
  @Input() productName: string = '';
  isLoading = false;
  productBalances: ProductBalance[] = [];
  isDisplayList = false;

  constructor(
    protected productBalance: ProductBalanceService,
    protected poNotification: PoNotificationService
  ) {}

  handleClickButton(): void {
    this.getProductBalance();
  }

  getProductBalance(): void {
    this.productBalance
      .getByProductId(this.productId)
      .pipe(
        tap(() => (this.isLoading = true)),
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: products => {
          this.productBalances = products;
          this.isDisplayList = true;
        },
        error: () => this.poNotification.error('Falha ao Localizar produto')
      })
  }

  hasProductBalance(): boolean {
    return this.productBalances.length > 0
  }
}
