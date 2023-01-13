import { PaymentMethod } from '../shared/interfaces/payment-method';

export const paymentMethods: PaymentMethod[] = [
  { id: 1, description: 'Dinheiro', icon: 'po-icon-money' },
  { id: 2, description: 'Debito', icon: ' po-icon-debit-payment' },
  { id: 3, description: 'PIX', icon: 'po-icon-pix-logo' },
  { id: 4, description: 'PicPay', icon: 'po-icon-debit-payment' },
  {
      id: 5,
      description: 'Mercado Pago',
      icon: 'po-icon-debit-payment'
  },
  { id: 6, description: 'Credito', icon: 'po-icon-credit-payment' },
  { id: 7, description: 'Boleto', icon: 'po-icon-bar-code' }
];
