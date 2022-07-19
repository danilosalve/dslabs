import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { Customer } from '../../shared/interface/customer';
import { CustomerType } from '../../shared/interface/customer-type';
import { CustomerModel } from '../../shared/model/customer-model';
import { CustomerStatus } from './../../shared/interface/customer-status.enum';

interface HeaderStatus {
    description: string;
    color: string;
    icon: string;
}

@Component({
    selector: 'app-registration-data',
    templateUrl: './registration-data.component.html'
})
export class RegistrationDataComponent implements OnInit {
    @Input() customer: Customer = new CustomerModel();
    fields: PoDynamicViewField[] = [];
    customerPresentation: any;
    isLoading = true;

    constructor(private customerService: CustomerService, private documentPipe: DocumentPipe) {}

    ngOnInit(): void {
        this.onInitView();
    }

    onInitView(): void {
        this.fields = this.getFields();
        this.transformHeader();
    }

    getFields(): PoDynamicViewField[] {
        const fields = this.customerService.getViewFields();
        const index = this.findFieldByProperty('statusDescription', fields);
        if (index >= 0) {
            const status = this.getStatus(this.customer.status);
            fields[index].color = status.color;
            fields[index].icon = status.icon;
        }
        return fields;
    }

    transformHeader(): void {
        this.customerPresentation = {
            ...this.customer,
            statusDescription: this.getStatus(this.customer.status).description,
            customerTypeDescription: this.getCustomerType(
                this.customer.customerType
            ),
            document: this.documentPipe.transform(this.customer.document)
        };
        this.isLoading = false;
    }

    getStatus(status: CustomerStatus): HeaderStatus {
        const customerStatus: HeaderStatus = {
            color: '',
            description: '',
            icon: ''
        };
        switch (status) {
            case CustomerStatus.active:
                customerStatus.description = 'Ativo';
                customerStatus.color = 'color-11';
                customerStatus.icon = 'po-icon-ok';
                break;
            case CustomerStatus.inactive:
                customerStatus.description = 'Inativo';
                customerStatus.color = 'color-07';
                customerStatus.icon = 'po-icon-lock';
                break;
                default:
                  customerStatus.description = 'Status Invalido';
                  customerStatus.color = 'color-07';
                  customerStatus.icon = 'po-icon-lock';
                break;
        }
        return customerStatus;
    }

    private findFieldByProperty(
        property: string,
        fields: PoDynamicViewField[]
    ): number {
        return fields.findIndex(f => f.property === property);
    }

    private getDescription(value: string | undefined): string {
        return value ? value : 'Não Especificado';
    }

    getCustomerType(type: string): string {
        switch (type) {
            case CustomerType.FINAL_COSTUMER:
                return 'Consumidor Final';
            case CustomerType.DEALER:
                return 'Revendedor';
            case CustomerType.EXPORT:
                return 'Exportação';
            case CustomerType.RURAL_PRODUCER:
                return 'Produtor Rural';
            default:
                return 'Não especificado';
        }
    }
}
