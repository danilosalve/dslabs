import { Injectable, Injector } from '@angular/core';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { CarrierService } from '@app/shared/services/carrier.service';
import { PaymentConditionsService } from '@app/shared/services/payment-conditions.service';
import { PaymentMethodService } from '@app/shared/services/payment-method.service';
import {
  PoDynamicFormField,
  PoDynamicViewField,
  PoTableColumn
} from '@po-ui/ng-components';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sales } from '../interfaces/sales';
import { SalesOrderTotal } from '../interfaces/sales-order-total';
import { PriceListService } from './../../../../shared/services/price-list.service';
import { SalesStatus } from './../interfaces/sales-status.enum';
import { TypeOfFreight } from './../interfaces/typeOfFreight.enum';
import { SalesTotalModel } from './../model/sales-total.model';
import { SalesItemsService } from './sales-items.service';

@Injectable({
    providedIn: 'root'
})
export class SalesService extends BaseResourceServiceFull<Sales> {
    constructor(
        protected override injector: Injector,
        private salesItemsService: SalesItemsService,
        private carrierService: CarrierService,
        private customerService: CustomerService,
        private methodService: PaymentMethodService,
        private conditionsService: PaymentConditionsService,
        private priceListService: PriceListService
    ) {
        super('api/sales/', injector);
    }

    getColumns(): PoTableColumn[] {
        return [
            {
                property: 'status',
                label: 'Status',
                type: 'label',
                width: '10%',
                labels: [
                    {
                        value: SalesStatus.Open,
                        color: 'color-11',
                        label: 'Aberto'
                    },
                    {
                        value: SalesStatus.Closed,
                        color: 'color-07',
                        label: 'Encerrado'
                    },
                    {
                        value: SalesStatus.Blocked,
                        color: 'color-08',
                        label: 'Bloqueado'
                    }
                ]
            },
            { property: 'id', label: 'Código', type: 'number', width: '8%' },
            { property: 'detail', label: 'detail', type: 'detail' },
            {
                property: 'customerId',
                label: 'Cliente',
                type: 'number',
                visible: false
            },
            { property: 'customerName', label: 'Nome Cliente', type: 'string' },
            {
                property: 'issueDate',
                label: 'Dt. Emissão',
                type: 'date',
                width: '15%'
            },
            {
                property: 'subTotal',
                label: 'Subtotal',
                type: 'currency',
                width: '15%'
            }
        ];
    }

    getHeadersForExcel(): string[] {
        return [
            'Código',
            'Cód. Cliente',
            'Metodo de Pagto',
            'Cód. Cond. de Pagto',
            'Emissão',
            'Transportadora',
            'Tab. Preço',
            'Status',
            'Desconto',
            'Tipo Frete',
            'Despesa',
            'Seguro',
            'Frete',
            'Comentario',
            'Nome do Cliente',
            'Sub-Total'
        ];
    }

    getFormFields(): Array<PoDynamicFormField> {
        let fields: Array<PoDynamicFormField> = [
            {
                label: 'Cliente',
                property: 'customerId',
                gridColumns: 3,
                gridSmColumns: 12,
                gridMdColumns: 6,
                gridLgColumns: 4,
                gridXlColumns: 3,
                required: true,
                placeholder: 'Selecione o Cliente',
                optionsService: this.customerService,
                icon: 'po-icon-user'
            },
            {
                label: 'Dt. Emissão',
                property: 'issueDate',
                type: 'date',
                format: 'dd/mm/yyyy',
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 6,
                gridLgColumns: 3,
                gridXlColumns: 3,
                required: true,
                disabled: true
            },
            {
                label: 'Modo de Pagamento',
                property: 'paymentMethodId',
                gridColumns: 3,
                gridSmColumns: 12,
                gridMdColumns: 5,
                gridLgColumns: 4,
                gridXlColumns: 3,
                required: true,
                divider: 'Pagamento',
                placeholder: 'Selecione o Modo de Pagamento',
                optionsService: this.methodService,
                icon: 'po-icon-payment'
            },
            {
                label: 'Prazo de Pagamento',
                property: 'paymentConditionsId',
                optional: true,
                gridColumns: 3,
                gridSmColumns: 12,
                gridMdColumns: 5,
                gridLgColumns: 4,
                gridXlColumns: 3,
                required: false,
                placeholder: 'Selecione a Condição de Pagamento',
                optionsService: this.conditionsService,
                icon: 'po-icon-handshake'
            },
            {
                label: 'Tab. de Preços',
                property: 'priceListId',
                optional: true,
                gridColumns: 3,
                gridSmColumns: 12,
                gridMdColumns: 5,
                gridLgColumns: 4,
                gridXlColumns: 3,
                required: false,
                placeholder: 'Selecione a Tabela de Preços',
                optionsService: this.priceListService,
                icon: 'po-icon-pallet-full'
            },
            {
                label: 'Desconto',
                property: 'discount',
                type: 'currency',
                optional: true,
                decimalsLength: 2,
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 3,
                gridLgColumns: 3,
                gridXlColumns: 2,
                minValue: 0,
                maxValue: 99.99,
                thousandMaxlength: 2,
                placeholder: '0,00',
                icon: 'po-icon-finance'
            },
            {
                label: 'Transportadora',
                property: 'carrierId',
                optional: true,
                gridColumns: 3,
                gridSmColumns: 12,
                gridMdColumns: 5,
                gridLgColumns: 4,
                gridXlColumns: 3,
                divider: 'Entrega',
                optionsService: this.carrierService,
                placeholder: 'Selecione a Transportadora',
                icon: 'po-icon-truck'
            },
            {
                label: 'Tp. Frete',
                property: 'typeOfFreight',
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 5,
                gridLgColumns: 4,
                gridXlColumns: 3,
                options: [
                    {
                        label: 'CIF',
                        value: TypeOfFreight.CIF
                    },
                    {
                        label: 'FOB',
                        value: TypeOfFreight.FOB
                    },
                    {
                        label: 'Por conta terceiros',
                        value: TypeOfFreight.TERCEIROS
                    },
                    {
                        label: 'Por conta remetente',
                        value: TypeOfFreight.REMETENTE
                    },
                    {
                        label: 'Por conta destinatário',
                        value: TypeOfFreight.DESTINARIO
                    },
                    {
                        label: 'Sem Frete',
                        value: TypeOfFreight.SEMFRETE
                    }
                ],
                divider: ''
            },
            {
                label: 'Frete',
                property: 'freight',
                type: 'currency',
                optional: true,
                decimalsLength: 2,
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 3,
                gridLgColumns: 3,
                gridXlColumns: 2,
                minValue: 0,
                placeholder: '0,00',
                disabled: false,
                icon: 'po-icon-pushcart'
            },
            {
                label: 'Seguro',
                property: 'insurance',
                type: 'currency',
                optional: true,
                decimalsLength: 2,
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 3,
                gridLgColumns: 3,
                gridXlColumns: 2,
                minValue: 0,
                placeholder: '0,00',
                icon: 'po-icon-finance-secure'
            },
            {
                label: 'Despesa',
                property: 'expenses',
                type: 'currency',
                optional: true,
                decimalsLength: 2,
                gridColumns: 2,
                gridSmColumns: 12,
                gridMdColumns: 3,
                gridLgColumns: 3,
                gridXlColumns: 2,
                minValue: 0,
                placeholder: '0,00',
                icon: 'po-icon-money'
            },
            {
                label: 'Comentario',
                property: 'comment',
                help: 'Informe um Comentario para o Pedido de Venda',
                rows: 3,
                optional: true,
                divider: 'Outros',
                gridColumns: 12,
                gridSmColumns: 12,
                gridMdColumns: 12,
                gridLgColumns: 12,
                gridXlColumns: 12,
                placeholder: 'O comentario não será enviado para a nota fiscal'
            }
        ];
        return fields;
    }

    getViewFields(): PoDynamicViewField[] {
        return [
            {
                property: 'id',
                label: 'Núm. Pedido',
                divider: 'Dados Gerais',
                key: true
            },
            { property: 'issueDate', label: 'Dt. Emissão', type: 'date' },
            {
                property: 'statusDescription',
                label: 'Status',
                tag: true,
                color: 'color-11',
                icon: 'po-icon-ok'
            },
            {
                property: 'customerId',
                label: 'Cliente',
                divider: 'Dados do Cliente',
                visible: false
            },
            {
                property: 'customerName',
                label: 'Nome',
                type: 'string',
                divider: 'Dados do Cliente'
            },
            { property: 'customerDocument', label: 'CNPJ/CPF', type: 'string' },
            { property: 'customerState', label: 'UF', type: 'string' },
            { property: 'customerCity', label: 'Municipio', type: 'string' },
            {
                property: 'paymentMethodDescription',
                label: 'Modo de Pagamento',
                divider: 'Pagamento'
            },
            {
                property: 'paymentConditionDescription',
                label: 'Condição de Pagamento'
            },
            { property: 'priceListDescription', label: 'Tab. de Preços' },
            { property: 'discount', label: 'Desconto', type: 'currency' },
            {
                property: 'carrierDescription',
                label: 'Transportadora',
                divider: 'Entrega'
            },
            { property: 'typeOfFreight', label: 'Tp. Frete', type: 'string' },
            { property: 'freight', label: 'Frete', type: 'currency' },
            { property: 'insurance', label: 'Seguro', type: 'currency' },
            { property: 'expenses', label: 'Despesa', type: 'currency' },
            {
                property: 'comment',
                label: 'Comentarios',
                type: 'string',
                divider: 'Outros'
            }
        ];
    }

    calculateSalesOrderTotal(
        sale: Sales,
        items: SalesItems[]
    ): SalesOrderTotal {
        let saleTotal: SalesOrderTotal = new SalesTotalModel();
        saleTotal.total += saleTotal.expense = sale.expenses! | 0;
        saleTotal.total += saleTotal.freight = sale.freight! | 0;
        saleTotal.total += saleTotal.insurance = sale.insurance! | 0;
        this.calculateSalesOrderItemsTotal(items, saleTotal);
        saleTotal.discounts += this.calculateSalesOrderDiscount(
            items,
            sale.discount! | 0
        );
        saleTotal.total += saleTotal.subTotal - saleTotal.discounts;
        return saleTotal;
    }

    async getAsyncSubtotalWithSaleId(id: number): Promise<number> {
        const data$ = this.salesItemsService.getBySalesId(id.toString()).pipe(
            map(items => items.filter(i => i.salesId === id)),
            map(items =>
                items.reduce((amount, currency) => amount + currency.amount, 0)
            )
        );

        try {
            return (await firstValueFrom(data$, { defaultValue: 0 })) ?? 0;
        } catch (e) {
            throw e;
        }
    }

    getSubtotalWithSaleId(id: number): Observable<number> {
        return this.salesItemsService.getBySalesId(id.toString()).pipe(
            map(items => items.filter(i => i.salesId === id)),
            map(items =>
                items.reduce((amount, currency) => amount + currency.amount, 0)
            )
        );
    }

    getTypeOfFreight(type: string): string {
        switch (type) {
            case TypeOfFreight.CIF:
                return 'CIF';
            case TypeOfFreight.FOB:
                return 'FOB';
            case TypeOfFreight.DESTINARIO:
                return 'Por conta - Destinario';
            case TypeOfFreight.REMETENTE:
                return 'Por conta - Remetente';
            case TypeOfFreight.TERCEIROS:
                return 'Por conta - Terceiros';
            case TypeOfFreight.SEMFRETE:
                return 'Sem Frete';
            default:
                return 'Não especificado';
        }
    }

    private calculateSalesOrderItemsTotal(
        items: SalesItems[],
        saleTotal: SalesOrderTotal
    ): void {
        saleTotal.subTotal = items.reduce(
            (amount, currency) => amount + currency.amount,
            0
        );
    }

    private calculateSalesOrderDiscount(
        items: SalesItems[],
        discount: number
    ): number {
        let itemDiscount = items.reduce((amount, currency) => {
            const discount: number = currency.discount! | 0;
            const value: number = currency.value! | 0;
            const quantity: number = currency.quantity! | 0;
            return discount
                ? amount +
                      this.calculateDiscountValue(value, discount, quantity)
                : amount;
        }, 0);
        return itemDiscount + discount;
    }

    private calculateDiscountValue(
        value: number,
        percentage: number,
        quantity: number
    ): number {
        return ((value * quantity) / 100) * percentage;
    }
}
