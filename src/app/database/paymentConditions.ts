import { PaymentCondition } from '../shared/interfaces/payment-condition';

export const paymentConditions: PaymentCondition[] = [
  { id: 1, description: 'A Vista', installments: 0, active: true },
  { id: 2, description: '10 Dias', installments: 1, active: true },
  { id: 3, description: '30 Dias', installments: 1, active: true },
  {
      id: 4,
      description: '2x - 60 dias',
      installments: 2,
      active: true
  },
  {
      id: 5,
      description: '3x - 30, 60, 90 dias',
      installments: 3,
      active: true
  },
  {
      id: 6,
      description: '4x - 120 dias',
      installments: 4,
      active: true
  },
  { id: 7, description: '5x Vezes', installments: 5, active: true },
  { id: 8, description: '6x Vezes', installments: 6, active: true },
  { id: 9, description: '10x Vezes', installments: 10, active: true },
  {
      id: 10,
      description: '12x s/ Juros',
      installments: 12,
      active: true
  },
  {
      id: 11,
      description: 'Pagto Antecipado',
      installments: 0,
      active: true
  }
];
