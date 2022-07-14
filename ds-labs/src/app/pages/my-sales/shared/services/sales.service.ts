import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoDynamicFormField, PoDynamicViewField, PoTableColumn } from '@po-ui/ng-components';
import { Sales } from '../interfaces/sales';
import { SalesStatus } from './../interfaces/sales-status.enum';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends BaseResourceServiceFull<Sales> {
  constructor(protected override injector: Injector) {
    super('api/sales/', injector);
  }

  getColumns(): PoTableColumn[] {
    return [
      { property: 'status', label: 'Status', type: 'label', labels: [
        { value: SalesStatus.Open, color: 'color-11', label: 'Aberto' },
        { value: SalesStatus.Closed, color: 'color-07', label: 'Encerrado' },
        { value: SalesStatus.Blocked, color: 'color-08', label: 'Bloqueado' }
      ]},
      { property: 'id', label: 'Código', type: 'number', width: '8%' },
      { property: 'customerId', label: 'Cliente', type: 'number', visible: false },
      { property: 'customerName', label: 'Nome Cliente', type: 'string' },
      { property: 'issueDate', label: 'Dt. Emissão', type: 'dateTime' }
    ];
  }

  getFormFields(): Array<PoDynamicFormField> {
    let fields:  Array<PoDynamicFormField> = [
      {
        label: 'Cliente',
        property: 'customerId',
        gridColumns: 3,
        gridSmColumns: 12,
        gridMdColumns: 5,
        gridLgColumns: 4,
        gridXlColumns: 3,
        options: [],
        required: true
      },
      {
        label: 'Dt. Emissão',
        property: 'issueDate',
        type: 'date',
        format: 'dd/mm/yyyy',
        gridColumns: 2,
        gridSmColumns: 12,
        gridMdColumns: 3,
        gridLgColumns: 3,
        gridXlColumns: 2,
        required: true,
        disabled: true
      },
      {
        label: 'Cond. Pagamento',
        property: 'paymentMethodId',
        gridColumns: 3,
        gridSmColumns: 12,
        gridMdColumns: 5,
        gridLgColumns: 4,
        gridXlColumns: 3,
        options: [],
        required: true,
        divider: 'Pagamento'
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
        options: [],
        required: false
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
        gridXlColumns: 2
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
        options: [],
        divider: 'Entrega'
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
        gridXlColumns: 2
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
        gridXlColumns: 2
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
        gridXlColumns: 2
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
        gridXlColumns: 12
      }
    ];
    return fields
  }

  getViewFields(): PoDynamicViewField[] {
    return [
      { property: 'id', label: 'Núm. Pedido', divider: 'Dados Gerais', key: true },
      { property: 'issueDate', label: 'Dt. Emissão', type: 'date' },
      { property: 'statusDescription', label: 'Status', tag: true, color: 'color-11', icon: 'po-icon-ok'},
      { property: 'customerId', label: 'Cliente', divider: 'Dados do Cliente' },
      { property: 'customerName', label: 'Nome', type: 'string' },
      { property: 'customerDocument', label: 'CNPJ/CPF', type: 'string' },
      { property: 'customerState', label: 'UF', type: 'string' },
      { property: 'customerCity', label: 'Municipio', type: 'string' },
      { property: 'paymentMethodDescription', label: 'Cond. Pagamento', divider: 'Pagamento' },
      { property: 'priceListDescription', label: 'Tab. de Preços' },
      { property: 'discount', label: 'Desconto', type: 'currency' },
      { property: 'carrierDescription', label: 'Transportadora', divider: 'Entrega' },
      { property: 'freight', label: 'Frete', type: 'currency' },
      { property: 'insurance', label: 'Seguro', type: 'currency' },
      { property: 'expenses', label: 'Despesa', type: 'currency' },
      { property: 'comment', label: 'Comentarios', type: 'string', divider: 'Outros'}
    ]
  }
}
