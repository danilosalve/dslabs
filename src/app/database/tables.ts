import { Table } from '@app/pages/my-settings/shared/interfaces/table';
import { TableStatus } from '@app/pages/my-settings/shared/interfaces/table-status.enum';

export const tables: Table[] = [
  {
      id: 1,
      table: 'SA1',
      description: 'Clientes',
      status: TableStatus.ACTIVATED,
      canEdit: true,
      filter: ''
  },
  {
      id: 2,
      table: 'SA4',
      description: 'Transportadoras',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 3,
      table: 'SE4',
      description: 'Condições de Pagamento',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 4,
      table: 'DA0',
      description: 'Tabela de Preços',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 5,
      table: 'SB1',
      description: 'Produtos',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 6,
      table: 'SB2',
      description: 'Saldos do Produto',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 7,
      table: 'SC5',
      description: 'Pedidos de Venda',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  },
  {
      id: 8,
      table: 'SC6',
      description: 'Itens dos Pedidos de Venda',
      status: TableStatus.ACTIVATED,
      canEdit: false,
      filter: ''
  }
];
