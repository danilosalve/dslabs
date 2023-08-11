import { IStatusCardSalesOrder } from '../interfaces/status-card-sales-order'

export class StatusCardSalesOrder {
  A: IStatusCardSalesOrder  = {
    description: 'Aberto',
    color: 'color-11'
  }
  E:IStatusCardSalesOrder = {
    description: 'Encerrado',
    color: 'color-07'
  }
  B: IStatusCardSalesOrder = {
    description: 'Bloqueado',
    color: 'color-08'
  }
  L: IStatusCardSalesOrder = {
    description: 'Aprovado',
    color: 'color-02'
  }
}

