import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input
} from '@angular/core';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { SalesOrderTotal } from '@app/pages/my-sales/shared/interfaces/sales-order-total';
import { SalesTotalModel } from '@app/pages/my-sales/shared/model/sales-total.model';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { PaymentConditionsService } from '@app/shared/services/payment-conditions.service';
import { PaymentMethodService } from '@app/shared/services/payment-method.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { take } from 'rxjs';

@Component({
    selector: 'app-sale-summary-with-payment',
    templateUrl: './sale-summary-with-payment.component.html'
})
export class SaleSummaryWithPaymentComponent implements DoCheck {
    @Input() sales: Sales | undefined;
    @Input() salesItems: SalesItems[] = [];
    installments = 0;
    installmentsList: any[] = [];
    paymentMethod = 'Não especificado';
    paymentMethodId = 0;
    paymentMethodIcon = '';
    paymentConditionId = 0;
    paymentCondition = 'Não especificado';
    saleTotal: SalesOrderTotal = new SalesTotalModel();

    constructor(
        private cd: ChangeDetectorRef,
        protected poNotificationService: PoNotificationService,
        protected paymentConditionService: PaymentConditionsService,
        protected paymentMethodService: PaymentMethodService,
        protected salesService: SalesService
    ) {}
    ngDoCheck(): void {
        if (
            this.sales?.paymentMethodId !== undefined &&
            this.paymentMethodId !== this.sales?.paymentMethodId
        ) {
            this.paymentMethodId = this.sales?.paymentMethodId;
            this.handlePaymentoMethod();
        }

        if (
            this.sales?.paymentConditionsId !== undefined &&
            this.paymentConditionId !== this.sales?.paymentConditionsId
        ) {
            this.paymentConditionId = this.sales?.paymentConditionsId;
            this.handlePaymentoCondition();
        }

        this.saleTotal = this.handleTotalSalesOrderAmount();
        this.cd.markForCheck();
    }

    handlePaymentoMethod(): void {
        this.paymentMethodService
            .getById(this.sales?.paymentMethodId!)
            .pipe(take(1))
            .subscribe({
                next: res => {
                    this.paymentMethod = res.description;
                    this.paymentMethodIcon = `icon-custom po-icon po-mr-1 ${res.icon}`;
                },
                error: () =>
                    this.handleError(
                        'da Metodo de Pagamento',
                        this.sales?.paymentConditionsId
                    )
            });
    }

    handlePaymentoCondition(): void {
        this.paymentConditionService
            .getById(this.sales?.paymentConditionsId!)
            .pipe(take(1))
            .subscribe({
                next: res => {
                    this.paymentCondition = res.description;
                    this.installments = res.installments;
                },
                error: () =>
                    this.handleError(
                        'da Condição de Pagamento',
                        this.sales?.paymentConditionsId
                    )
            });
    }

    handleTotalSalesOrderAmount(): SalesOrderTotal {
        let saleTotal: SalesOrderTotal = new SalesTotalModel();
        if (this.salesItems.length > 0) {
            saleTotal = this.salesService.calculateSalesOrderTotal(
                this.sales!,
                this.salesItems
            );
            this.installmentsList = [];
            if (this.installments > 0 && saleTotal.total > 0) {
                const installmentValue = (
                    saleTotal.total / this.installments
                ).toFixed(2);
                for (let index = 0; index < this.installments; index++) {
                    this.installmentsList.push(installmentValue);
                }
            }

            return saleTotal;
        }
        return saleTotal;
    }

    handleError(description: string, id: number | undefined): void {
      this.poNotificationService.error(
          `Não foi possivel obter os dados ${description}: ${id}`
      );
  }
}
