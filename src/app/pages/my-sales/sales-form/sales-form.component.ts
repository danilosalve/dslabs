import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceForm } from '@app/shared/components/base/base-resource-form.component';
import { ProductBalanceService } from '@app/shared/services/product-balance.service';
import {
  PoAccordionItemComponent,
  PoBreadcrumb,
  PoDynamicFormField
} from '@po-ui/ng-components';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Sales } from '../shared/interfaces/sales';
import { SalesStatus } from '../shared/interfaces/sales-status.enum';
import { SalesModel } from '../shared/model/sales-model';
import { SalesItemsService } from '../shared/services/sales-items.service';
import { SalesService } from '../shared/services/sales.service';
import { SalesItems } from './../shared/interfaces/sales-items';
@Component({
    selector: 'app-sales-form',
    templateUrl: './sales-form.component.html'
})
export class SalesFormComponent extends BaseResourceForm {
    sales: Sales = new SalesModel();
    dynamicForm: NgForm | undefined;
    salesItems: SalesItems[] = [];
    itemId = 0;
    @ViewChild(PoAccordionItemComponent, { static: true })
    generaldata!: PoAccordionItemComponent;

    constructor(
        protected customerService: CustomerService,
        protected productBalance: ProductBalanceService,
        protected salesService: SalesService,
        protected salesItemService: SalesItemsService,
        protected override injector: Injector
    ) {
        super(injector, 'sales', true);
    }

    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Pedidos', action: this.handleBack.bind(this) },
                { label: 'Novo Pedido' }
            ]
        };
    }

    onSubmit(): void {
        if (this.canSaveSalesOrder()) {
            this.salesService
                .create(this.sales)
                .pipe(
                    tap(res => this.updateSalesIdOnItems(res.id)),
                    switchMap(sales => {
                        this.salesItems.forEach(item =>
                            this.salesItemService.create(item).subscribe({
                                error: () => this.handleErrorSubmit()
                            })
                        );
                        return of(sales);
                    })
                )
                .subscribe({
                    next: sale => {
                        this.poNotification.success(
                            `Pedido de Venda ${sale.id} incluído com sucesso!!!`
                        );
                        this.updateCustomerLastPurchaseDate(sale.customerId);
                        this.updateProductBalance(this.salesItems);
                        this.handleBack();
                    },
                    error: () => this.handleErrorSubmit()
                });
        } else {
            if (this.salesItems.length === 0) {
                this.poNotification.error(
                    'Adicione ao menos um produto no carrinho para Salvar o Pedido'
                );
            } else {
                this.poNotification.error(
                    'Um ou mais campos obrigatorios não foram preenchidos'
                );
            }
        }
    }

    handleErrorSubmit(): void {
        this.poNotification.error('Falha ao incluir Pedido');
    }

    addSalesItem(salesItem: any): void {
        if (this.hasItem(salesItem)) {
            this.updateSaleItem(salesItem);
        } else {
            this.salesItems = [...this.salesItems.concat(salesItem)];
        }
        this.handleSalesOrderStatus(salesItem);
        this.isDisableSubmit = !this.canSaveSalesOrder();
    }

    hasItem(salesItem: SalesItems): boolean {
        return this.salesItems.some(i => i.productId === salesItem.productId);
    }

    updateSaleItem(salesItem: SalesItems): void {
        const index = this.salesItems.findIndex(
            i => i.productId === salesItem.productId
        );
        if (index >= 0) {
            this.salesItems[index] = salesItem;
        }
    }

    updateSalesIdOnItems(id: number): void {
        this.salesItems.map(items => (items.salesId = id));
    }

    canSaveSalesOrder(): boolean {
        return this.dynamicForm?.valid! && this.salesItems.length > 0;
    }

    getForm(form: NgForm) {
        this.dynamicForm = form;
        this.dynamicForm.valueChanges?.subscribe(() => {
            this.isDisableSubmit = !this.canSaveSalesOrder();
        });
    }

    getFields(): PoDynamicFormField[] {
        throw new Error('Method not implemented.');
    }

    updateCustomerLastPurchaseDate(id: number): void {
        this.customerService
            .getById(id)
            .pipe(
                tap(customer => (customer.lastPurchase = new Date())),
                switchMap(customer =>
                    this.customerService.put(customer, customer.id)
                )
            )
            .subscribe();
    }

    updateProductBalance(items: SalesItems[]): void {
        items.forEach(i => {
            this.productBalance
                .getByProductId(i.productId)
                .pipe(
                    map(products => ({
                        ...products[0],
                        orderquantity: i.quantity
                    })),
                    switchMap(product =>
                        this.productBalance.put(product, product.id)
                    )
                )
                .subscribe();
        });
    }

    handleSalesOrderStatus(item: SalesItems): void {
        this.productBalance
            .getByProductId(item.productId)
            .pipe(
                map(productBalances =>
                    productBalances.reduce(
                        (acc, currency) => acc + currency.availablequantity,
                        0
                    )
                )
            )
            .subscribe({
                next: avaliableQuantity =>
                    avaliableQuantity <= 0 || avaliableQuantity <= item.quantity
                        ? (this.sales.status = SalesStatus.Blocked)
                        : undefined
            });
    }
}
