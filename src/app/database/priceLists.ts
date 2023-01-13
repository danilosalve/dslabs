import { PriceList } from '../shared/interfaces/price-list/price-list';

export const priceLists: PriceList[] = [
  {
      id: 1,
      description: 'PADRÃO',
      active: true
  },
  {
      id: 2,
      description: 'FINAL DA FEIRA',
      active: true
  },
  {
      id: 3,
      description: 'SOMENTE NO DINHEIRO',
      active: true,
      paymentMethod: 1
  },
  {
      id: 4,
      description: 'DESATIVADA',
      active: false
  }
];
