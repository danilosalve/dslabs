import { Field } from '@app/pages/my-settings/shared/interfaces/field';
import { FieldType } from '@app/pages/my-settings/shared/interfaces/field-type.enum';

export const fields: Field[] = [
  {
      id: 1,
      tableId: 1,
      field: 'id',
      label: 'Código',
      description: 'Código do Cliente',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 2,
      tableId: 1,
      field: 'name',
      label: 'Nome',
      description: 'Nome/Razão Social do Cliente',
      type: FieldType.STRING,
      lenght: 20,
      decimal: 0
  },
  {
      id: 3,
      tableId: 1,
      field: 'document',
      label: 'CPF/CNPJ',
      description: 'CPF/CNPJ',
      type: FieldType.STRING,
      lenght: 14,
      decimal: 0
  },
  {
      id: 4,
      tableId: 1,
      field: 'state',
      label: 'UF',
      description: 'Estado/Unidade Federativa',
      type: FieldType.STRING,
      lenght: 2,
      decimal: 0
  },
  {
      id: 5,
      tableId: 1,
      field: 'city',
      label: 'Municipio',
      description: 'Cidade/Municipio',
      type: FieldType.STRING,
      lenght: 20,
      decimal: 0
  },
  {
      id: 6,
      tableId: 1,
      field: 'status',
      label: 'Status',
      description: 'Status do Cliente',
      type: FieldType.STRING,
      lenght: 1,
      decimal: 0
  },
  {
      id: 7,
      tableId: 1,
      field: 'customerType',
      label: 'Tipo',
      description: 'Tipo do Cliente',
      type: FieldType.STRING,
      lenght: 1,
      decimal: 0
  },
  {
      id: 8,
      tableId: 1,
      field: 'registerDate',
      label: 'Dt. Nasc/Registro',
      description: 'Data de Nascimento/Registro',
      type: FieldType.DATE,
      lenght: 8,
      decimal: 0
  },
  {
      id: 9,
      tableId: 5,
      field: 'id',
      label: 'Código',
      description: 'Código do Produto',
      type: FieldType.STRING,
      lenght: 4,
      decimal: 0
  },
  {
      id: 10,
      tableId: 5,
      field: 'description',
      label: 'Descrição',
      description: 'Descrição genérica do Produto',
      type: FieldType.STRING,
      lenght: 30,
      decimal: 0
  },
  {
      id: 11,
      tableId: 5,
      field: 'price',
      label: 'Preço Unitário',
      description: 'Valor unitário do Produto',
      type: FieldType.NUMBER,
      lenght: 16,
      decimal: 2
  },
  {
      id: 12,
      tableId: 7,
      field: 'id',
      label: 'Cód. Pedido',
      description: 'Código do Pedido de venda',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 13,
      tableId: 7,
      field: 'customerId',
      label: 'Cód. Cliente',
      description: 'Código do Cliente',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 14,
      tableId: 7,
      field: 'issueDate',
      label: 'Dt. Emissão',
      description: 'Data de emissão do Pedido',
      type: FieldType.DATE,
      lenght: 8,
      decimal: 0
  },
  {
      id: 15,
      tableId: 7,
      field: 'carrierId',
      label: 'Cód. Transportadora',
      description: 'Código da Transportadora',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 16,
      tableId: 7,
      field: 'priceListId',
      label: 'Cód. Tab. Preço',
      description: 'Código da Tabela de preço',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 17,
      tableId: 8,
      field: 'salesId',
      label: 'Cód. Pedido',
      description: 'Código do Pedido de venda',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 18,
      tableId: 8,
      field: 'itemId',
      label: 'Item',
      description: 'Número do Item',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 19,
      tableId: 8,
      field: 'productId',
      label: 'Cód. Produto',
      description: 'Código do Produto',
      type: FieldType.STRING,
      lenght: 15,
      decimal: 0
  },
  {
      id: 20,
      tableId: 8,
      field: 'productName',
      label: 'Desc. do Produto',
      description: 'Descrição do Produto',
      type: FieldType.STRING,
      lenght: 15,
      decimal: 0
  },
  {
      id: 21,
      tableId: 8,
      field: 'value',
      label: 'Vlr. Unitário',
      description: 'Valor Unitário do item',
      type: FieldType.NUMBER,
      lenght: 14,
      decimal: 2
  },
  {
      id: 22,
      tableId: 8,
      field: 'quantity',
      label: 'Quantidade',
      description: 'Quantidade do item',
      type: FieldType.NUMBER,
      lenght: 6,
      decimal: 0
  },
  {
      id: 23,
      tableId: 8,
      field: 'amount',
      label: 'Vlr. Total',
      description: 'Valor total do item',
      type: FieldType.NUMBER,
      lenght: 14,
      decimal: 2
  }
];
