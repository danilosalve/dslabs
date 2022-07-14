import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { PaymentMethodService } from '@app/shared/services/payment-method.service';
import { PoDynamicViewField, PoNotificationService } from '@po-ui/ng-components';
import { forkJoin, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Sales } from '../../shared/interfaces/sales';
import { SalesStatus } from '../../shared/interfaces/sales-status.enum';
import { CarrierService } from './../../../../shared/services/carrier.service';
import { PriceListService } from './../../../../shared/services/price-list.service';
import { SalesModel } from './../../shared/model/sales-model';

interface HeaderStatus {
    description: string;
    color: string;
}

@Component({
    selector: 'app-general-data',
    templateUrl: './general-data.component.html'
})
export class GeneralDataComponent implements OnInit {
    @Input() header: Sales = new SalesModel();
    fields: PoDynamicViewField[] = [];
    headerPresentation: any;
    isLoading = true;

    constructor(
      protected carrierService: CarrierService,
      protected customerService: CustomerService,
      protected paymentService: PaymentMethodService,
      protected poNotificationService: PoNotificationService,
      protected priceListService: PriceListService,
      protected salesService: SalesService
    ) {}

    ngOnInit(): void {
        this.onInitView();
    }

    onInitView(): void {
        this.fields = this.getFields();
        this.transformHeader();
    }

    getFields(): PoDynamicViewField[] {
        const fields = this.salesService.getViewFields();
        const index = this.findFieldByProperty('statusDescription', fields);
        if (index >= 0) {
            fields[index].color = this.getStatus(this.header.status).color;
        }
        return fields;
    }

    transformHeader(): void {
        this.headerPresentation = {
            ...this.header,
            statusDescription: this.getStatus(this.header.status).description,
            discount: this.header.discount ? this.header.discount : 0,
            freight: this.header.freight ? this.header.freight : 0,
            insurance: this.header.insurance ? this.header.insurance : 0,
            expenses: this.header.expenses ? this.header.expenses : 0,
            comment: this.getDescription(this.header.comment)
        };
        this.getResources(this.header);
        this.isLoading = false
    }

    getStatus(status: SalesStatus): HeaderStatus {
        const headerStatus: HeaderStatus = {
            color: '',
            description: ''
        };

        switch (status) {
            case SalesStatus.Open:
                headerStatus.description = 'Aberto';
                headerStatus.color = 'color-11';
                break;
            case SalesStatus.Closed:
                headerStatus.description = 'Encerrado';
                headerStatus.color = 'color-07';
                break;
            case SalesStatus.Blocked:
                headerStatus.description = 'Bloqueado';
                headerStatus.color = 'color-08';
                break;
            default:
                headerStatus.description = 'Status Invalido';
                break;
        }
        return headerStatus;
    }

    findFieldByProperty(
        property: string,
        fields: PoDynamicViewField[]
    ): number {
        return fields.findIndex(f => f.property === property);
    }

    getResources(header: Sales): void {
      forkJoin({
        customer: this.customerService.getById(header.customerId!),
        paymentMethod: header.paymentMethodId ? this.paymentService.getById(header.paymentMethodId!): of({description: 'Nao Especificado'}),
        priceList: header.priceListId ? this.priceListService.getById(header.priceListId!): of({description: 'Nao Especificado'}),
        carrier: header.carrierId ? this.carrierService.getById(header.carrierId!): of({name: 'Nao Especificado'})
      })
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: response => {
          this.headerPresentation = {
            ...this.headerPresentation,
            customerName: response.customer.name,
            customerDocument: response.customer.document,
            customerState: response.customer.state,
            customerCity: response.customer.city,
            paymentMethodDescription: this.getDescription(response.paymentMethod.description),
            priceListDescription: this.getDescription(response.priceList.description),
            carrierDescription: this.getDescription(response.carrier.name)
          }
        },
        error: () => this.poNotificationService.error('Problema ao Obter recursos')
      })
    }

    getDescription(value: string | undefined): string {
      return value ? value : 'Não Especificado';
    }
}
