import { ChangeDetectorRef, Component, DoCheck, Input } from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { CarrierService } from '@app/shared/services/carrier.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { take, tap } from 'rxjs/operators';

@Component({
    selector: 'app-sale-summary-with-delivery',
    templateUrl: './sale-summary-with-delivery.component.html'
})
export class SaleSummaryWithDeliveryComponent implements DoCheck {
    @Input() sales: Sales | undefined;
    carrierName = 'Não especificado';
    customerId = 0;
    carrierId = 0;
    deliveryAddress = '';

    constructor(
        protected customerService: CustomerService,
        protected carrierService: CarrierService,
        protected poNotificationService: PoNotificationService,
        protected salesService: SalesService,
        private cd: ChangeDetectorRef
    ) {}

    ngDoCheck(): void {
        if (this.hasCustomer() && this.customerId !== this.sales?.customerId) {
            this.customerId = this.sales?.customerId!;
            this.handleCustomerAddress();
        }

        if (this.hasCarrier() && this.carrierId !== this.sales?.carrierId!) {
            this.carrierId = this.sales?.carrierId!;
            this.handleCarrierName();
        }

        this.cd.markForCheck();
    }

    hasCustomer(): boolean {
        return this.sales?.customerId !== undefined;
    }

    hasCarrier(): boolean {
        return this.sales?.carrierId !== undefined;
    }

    handleCustomerAddress(): void {
        this.customerService
            .getById(this.sales?.customerId!)
            .pipe(
                take(1),
                tap(() => (this.deliveryAddress = 'Carregando...'))
            )
            .subscribe({
                next: customer =>
                    (this.deliveryAddress = `${customer.addressDelivery} - ${customer.zipCodeDelivery} - ${customer.neighborhoodDelivery}, ${customer.cityDelivery} - ${customer.stateDelivery}`),
                error: () =>
                    this.handleError('do Cliente', this.sales?.customerId)
            });
    }

    handleCarrierName(): void {
        this.carrierService
            .getById(this.carrierId)
            .pipe(
                take(1),
                tap(() => (this.carrierName = 'Carregando...'))
            )
            .subscribe({
                next: carrier => (this.carrierName = carrier.name),
                error: () =>
                    this.handleError('da Transportadora', this.sales?.carrierId)
            });
    }

    handleError(description: string, id: number | undefined): void {
        this.poNotificationService.error(
            `Não foi possivel obter os dados ${description}: ${id}`
        );
    }

    getTypeOfFreight(type: string): string {
        return this.salesService.getTypeOfFreight(type);
    }
}
