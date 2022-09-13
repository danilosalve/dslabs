import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoDisclaimer, PoPageAction } from '@po-ui/ng-components';
import { finalize, tap } from 'rxjs';

@Component({
    selector: 'app-list-resource',
    templateUrl: './list-resource.component.html'
})
export class ListResourceComponent extends BaseResourceList<Customer> implements OnChanges {
    @Output() disclaimerEvent = new EventEmitter();
    @Input() disclaimer: PoDisclaimer[] = [];
    @Input() quickFilter = '';
    @Input() advancedFilter: any;

    codeList: string[] = [];
    nameList: string[] = [];
    documentList: string[] = [];
    isCodeEqual = false;
    isNameEqual = false;
    isDocumentEqual = false;

    constructor(
        protected customerService: CustomerService,
        protected override injector: Injector
    ) {
        super(injector, customerService);
    }
    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes) {
            const change = changes[propName];
            if (!change.firstChange) {
                if (propName === 'advancedFilter') {
                    this.handleAdvancedFilter();
                }

                if (propName === 'quickFilter') {
                }

                if (
                    propName === 'advancedFilter' ||
                    propName === 'quickFilter'
                ) {
                    this.getItems('#');
                }
            }
        }
    }

    getActions(): PoPageAction[] {
        throw [];
    }

    handleSearch(resource: Customer[], search: string): Customer[] {
        resource = this.handleQuickFilter(resource);

        if (this.advancedFilter) {
            resource = this.filterByNameList(resource);
            resource = this.filterByCodeList(resource);
            resource = this.filterByDocumentList(resource);
        }

        return resource;
    }

    handleDisclaimerEvent(resource: any): void {
        const index = this.disclaimer.findIndex(d => d.value === resource.id);

        if (resource.isSelected && index < 0) {
            this.addDisclaimer(
                resource.id + '',
                `Cod. Cliente: ${resource.id}`,
                resource.id
            );
        } else if (index >= 0 && this.disclaimer.length > 0) {
            this.disclaimer.splice(index, 1);
        }

        this.disclaimerEvent.emit(this.disclaimer);
    }

    addDisclaimer(
        property: string,
        label: string,
        value: string | number
    ): void {
        this.disclaimer.push({ property, label, value });
    }

    override getItems(search?: string): void {
        this.items$ = this.resourceService
            .getAll()
            .pipe(
                tap(() => {
                    this.items = [];
                    this.isLoading = true;
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: resource => {
                    if (search) {
                        this.items = this.handleSearch(resource, search);
                    } else {
                        this.items = resource;
                    }
                    this.markItems();
                    this.items =
                        this.items.length < 15
                            ? this.items
                            : this.items.slice(0, 15);
                },
                error: () =>
                    this.poNotification.error('Falha ao carregar Lista')
            });
    }

    markItems(): void {
        if (this.disclaimer.length > 0) {
            this.disclaimer.forEach(d => {
                let index = this.items.findIndex(i => d.value === i.id);
                this.items[index].$selected = index >= 0;
            });
        }
    }

    handleAdvancedFilter(): void {
        for (const propName in this.advancedFilter) {
            const value = this.advancedFilter[propName];

            switch (propName) {
                case 'code':
                    this.codeList = value ? this.separateByComma(value) : [];
                    break;
                case 'codeType':
                    this.isCodeEqual = this.isSelectedEqualOperator(value);
                    break;
                case 'name':
                    this.nameList = value ? this.separateByComma(value) : [];
                    break;
                case 'nameType':
                    this.isNameEqual = this.isSelectedEqualOperator(value);
                    break;
                case 'document':
                    this.documentList = value
                        ? this.separateByComma(value)
                        : [];
                    break;
                case 'documentType':
                    this.isDocumentEqual = this.isSelectedEqualOperator(value);
                    break;
            }
        }
    }

    isSelectedEqualOperator(value: number): boolean {
        return value === 1;
    }

    separateByComma(text: string): string[] {
        return text.toLowerCase().split(',');
    }

    hasCustomerById(id: number, customers: Customer[]): boolean {
        return customers.findIndex(customer => customer.id === id) >= 0;
    }

    filterByNameList(resource: Customer[]): Customer[] {
        if (this.nameList.length > 0) {
            let customers: Customer[] = [];
            this.nameList.forEach(name => {
                name = name.trim();
                const customerFiltered = resource.filter(item =>
                    this.isNameEqual
                        ? item.name.toLowerCase() === name
                        : item.name.toLowerCase().includes(name)
                );
                customers = this.concatfilteredCustomers(
                    customerFiltered,
                    customers
                );
            });
            return customers;
        } else {
            return resource;
        }
    }

    filterByCodeList(resource: Customer[]): Customer[] {
        if (this.codeList.length > 0) {
            let customers: Customer[] = [];
            this.codeList.forEach(id => {
                id = id.trim();
                const customerFiltered = resource.filter(item =>
                    this.isCodeEqual
                        ? item.id.toString() === id
                        : item.id.toString().includes(id)
                );
                customers = this.concatfilteredCustomers(
                    customerFiltered,
                    customers
                );
            });
            return customers;
        } else {
            return resource;
        }
    }

    filterByDocumentList(resource: Customer[]): Customer[] {
        if (this.documentList.length > 0) {
            let customers: Customer[] = [];
            this.documentList.forEach(document => {
                document = document.trim();
                const customerFiltered = resource.filter(item =>
                    this.isDocumentEqual
                        ? item.document === document
                        : item.document.includes(document)
                );
                customers = this.concatfilteredCustomers(
                    customerFiltered,
                    customers
                );
            });
            return customers;
        } else {
            return resource;
        }
    }

    concatfilteredCustomers(
        customerFiltered: Customer[],
        customers: Customer[]
    ): Customer[] {
        customerFiltered.forEach(customer => {
            if (!this.hasCustomerById(customer.id, customers)) {
                customers = customers.concat(customer);
            }
        });
        return customers;
    }

    handleQuickFilter(resource: Customer[]): Customer[] {
      const mounth = new Date().getMonth();
      const year = new Date().getFullYear();
      let initialDate = new Date();
      let finalDate = new Date();

      switch (this.quickFilter) {
        case 'lastMonth':
          initialDate = this.getFirstDay(year, mounth - 1);
          finalDate = this.getLastDay(year, mounth - 1);
          resource = resource.filter(item => new Date(item.lastPurchase) >= initialDate && new Date(item.lastPurchase) <= finalDate);
          break;
        case 'lastThreeMonths':
          initialDate = this.getFirstDay(year, mounth - 3);
          finalDate = this.getLastDay(year, mounth - 1);
          resource = resource.filter(item => new Date(item.lastPurchase) >= initialDate && new Date(item.lastPurchase) <= finalDate);
          break;
        case 'newCustomers':
          initialDate = this.getFirstDay(year, mounth - 1);
          finalDate = this.getLastDay(year, mounth - 1);
          break;
        case 'customersWithoutSale':
          initialDate = this.getFirstDay(year, mounth - 1);
          finalDate = this.getLastDay(year, mounth - 1);
          resource = resource.filter(item => new Date(item.lastPurchase) <= initialDate || new Date(item.lastPurchase) >= finalDate);
          break;
      }
      return resource;
    }

    getFirstDay(year: number, mounth: number): Date {
      return new Date(year, mounth, 1);
    }

    getLastDay(year: number, mounth: number): Date {
      return new Date(year, mounth + 1, 0);
    }
}
