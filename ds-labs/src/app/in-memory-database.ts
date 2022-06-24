import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { Customer } from './pages/my-customers/shared/interface/customer';
import { CustomerStatus } from './pages/my-customers/shared/interface/customer-status.enum';
import { Sales } from './pages/my-sales/shared/interfaces/sales';
import { SalesItems } from './pages/my-sales/shared/interfaces/sales-items';
import { SalesStatus } from './pages/my-sales/shared/interfaces/sales-status.enum';
import { Carrier } from './shared/interfaces/carrier';
import { PaymentMethod } from './shared/interfaces/payment-method';
import { Product } from './shared/interfaces/product';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const carriers: Carrier[] = [
      {
        id: 1,
        name: 'Ligeirinho Express'
      },
      {
        id: 2,
        name: 'Estrela Cadente Express'
      },
      {
        id: 3,
        name: 'RodoNeves'
      },
      {
        id: 4,
        name: 'Sedax 11'
      },
      {
        id: 5,
        name: 'Fusca Azul Transportes'
      },
    ];

    const customers: Customer[] = [
      {
        id: 1,
        name: 'MADG Marketing ME',
        document: '84696014000181',
        state: 'SP',
        city: 'Bragança Paulista',
        status: CustomerStatus.active
      },
      {
        id: 2,
        name: 'Breadcrumb Padaria ME',
        document: '52299624000155',
        state: 'AM',
        city: 'Manaus',
        status: CustomerStatus.active
      },
      {
        id: 3,
        name: 'Kibaum Alimentos ME',
        document: '41129289000120',
        state: 'MG',
        city: 'Timóteo',
        status: CustomerStatus.active
      },
      {
        id: 4,
        name: 'Marcenaria do Manuel Ltda',
        document: '23478793000154',
        state: 'MG',
        city: 'Ipatinga',
        status: CustomerStatus.inactive
      },
      {
        id: 5,
        name: 'CactusMovie Filmagens Ltda',
        document: '97174374000165',
        state: 'CE',
        city: 'Maracanaú',
        status: CustomerStatus.active
      },
      {
        id: 6,
        name: 'Três Irmãos Informática ME',
        document: '84870812000188',
        state: 'GO',
        city: 'Luziânia',
        status: CustomerStatus.active
      },
      {
        id: 7,
        name: 'Paulo e Aline Tecnologia Ltda',
        document: '80040460000182',
        state: 'SP',
        city: 'São Paulo',
        status: CustomerStatus.active
      },
      {
        id: 8,
        name: 'Mudanças Ursinhos Ltda',
        document: '90054224000179',
        state: 'PR',
        city: 'Curitiba',
        status: CustomerStatus.active
      },
    ];

    const paymentMethod: PaymentMethod[] = [
      { id: 1, description: 'A Vista' },
      { id: 2, description: 'A prazo 30 Dias' },
      { id: 3, description: '3x - 30, 60 e 90' },
      { id: 4, description: 'Pagamento Antecipado' },
      { id: 5, description: '2x - 0 + 30 dias' },
    ];

    const products: Product[] = [
      {
        id: '0001',
        description: 'SMARTPHONE IPEAR 15',
        price: 15099.9
      },
      {
        id: '0002',
        description: 'NOTEBOOK CEUU',
        price: 5099.99
      },
      {
        id: '0003',
        description: 'TELEVISÃO 43',
        price: 2398.75
      },
      {
        id: '0004',
        description: 'MONITOR 23.5',
        price: 899.9
      },
      {
        id: '0005',
        description: 'NOTEBOOK GAMER',
        price: 3699.00
      },
      {
        id: '0006',
        description: 'TELEVISÃO 50 4K',
        price: 2599
      },
      {
        id: '0007',
        description: 'TELEVISÃO 65 4K',
        price: 3989.05

      },
      {
        id: '0008',
        description: 'SMARTPHONE XINGLING',
        price: 1551.03
      },
      {
        id: '0009',
        description: 'KIT TECLADO+MOUSE GAMER 5X1',
        price: 214
      },
      {
        id: '0010',
        description: 'TECLADO GAMER',
        price: 52.74
      },
      {
        id: '0011',
        description: 'MOUSE GAMER',
        price: 269
      },
      {
        id: '0012',
        description: 'CADEIRA GAMER AZUL',
        price: 1349.9
      },
      {
        id: '0013',
        description: 'CADEIRA GAMER VERMELHA',
        price: 1434
      },
      {
        id: '0014',
        description: 'CADEIRA ESCRITORIO',
        price: 925
      },
      {
        id: '0015',
        description: 'MOUSE SEM FIO',
        price: 925
      }
  ];

  const sales: Sales[] = [
    {
      id: 1,
      customerId: 1,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 1,
      status: SalesStatus.Closed
    },
    {
      id: 2,
      customerId: 2,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 1,
      status: SalesStatus.Closed
    },
    {
      id: 3,
      customerId: 1,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 5,
      status: SalesStatus.Closed
    },
    {
      id: 4,
      customerId: 3,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 4,
      status: SalesStatus.Open
    },
    {
      id: 5,
      customerId: 3,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 3,
      status: SalesStatus.Closed
    },
    {
      id: 6,
      customerId: 2,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 2,
      status: SalesStatus.Open
    },
    {
      id: 7,
      customerId: 4,
      paymentMethodId: 1,
      issueDate: new Date(),
      carrierId: 2,
      status: SalesStatus.Open
    }
  ];

  const salesItems: SalesItems[] = [
    { id: 1, salesId: 1, itemId: 1, productId: '0001', value: 2499.99, quantity: 2, amount: 2499.99, productName: '' },
    { id: 2, salesId: 1, itemId: 1, productId: '0002', value: 5099.99, quantity: 1, amount: 10199.98, productName: '' },
    { id: 3, salesId: 1, itemId: 1, productId: '0003', value: 3099.99, quantity: 3, amount: 9299.97, productName: '' },
    { id: 4, salesId: 2, itemId: 1, productId: '0001', value: 2499.99, quantity: 4, amount: 9999.96, productName: '' },
    { id: 5, salesId: 2, itemId: 1, productId: '0002', value: 5099.99, quantity: 6, amount: 30599.94, productName: '' },
    { id: 6, salesId: 3, itemId: 1, productId: '0003', value: 3099.99, quantity: 7, amount: 21699.93, productName: '' },
    { id: 7, salesId: 4, itemId: 1, productId: '0001', value: 2499.99, quantity: 10, amount: 24990.99, productName: '' },
    { id: 8, salesId: 4, itemId: 1, productId: '0003', value: 3099.99, quantity: 1, amount: 3099.99, productName: '' },
    { id: 9, salesId: 4, itemId: 1, productId: '0002', value: 5099.99, quantity: 12, amount: 61199.88, productName: '' },
    { id: 10, salesId: 5, itemId: 1, productId: '0003', value: 3099.99, quantity: 8, amount: 24799.92, productName: '' },
    { id: 11, salesId: 5, itemId: 1, productId: '0002', value: 5099.99, quantity: 6, amount: 30599.94, productName: '' },
    { id: 12, salesId: 6, itemId: 1, productId: '0001', value: 2499.99, quantity: 5, amount: 12499.95, productName: '' },
    { id: 13, salesId: 7, itemId: 1, productId: '0002', value: 5099.99, quantity: 3, amount: 15299.97, productName: '' },
    { id: 14, salesId: 7, itemId: 1, productId: '0001', value: 2499.99, quantity: 1, amount: 2499.99, productName: '' }
  ];
    const db = { carriers, customers, paymentMethod, products, sales, salesItems };
    return of(db).pipe(delay(1300));
  }
}
