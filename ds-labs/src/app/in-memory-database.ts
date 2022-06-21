import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { Customer } from './pages/my-customers/shared/interface/customer';
import { CustomerStatus } from './pages/my-customers/shared/interface/customer-status.enum';
import { Sales } from './pages/my-sales/shared/interfaces/sales';
import { SalesStatus } from './pages/my-sales/shared/interfaces/sales-status.enum';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const customers: Customer[] = [
      {
        id: 1,
        name: 'Antônia e Gael Marketing ME',
        document: '84696014000181',
        state: 'SP',
        city: 'Bragança Paulista',
        status: CustomerStatus.active
      },
      {
        id: 2,
        name: 'Carlos e Louise Padaria ME',
        document: '52299624000155',
        state: 'AM',
        city: 'Manaus',
        status: CustomerStatus.active
      },
      {
        id: 3,
        name: 'Gabrielly e Isabelle Alimentos ME',
        document: '41129289000120',
        state: 'MG',
        city: 'Timóteo',
        status: CustomerStatus.active
      },
      {
        id: 4,
        name: 'Aline e Emanuel Marcenaria Ltda',
        document: '23478793000154',
        state: 'MG',
        city: 'Ipatinga',
        status: CustomerStatus.inactive
      },
      {
        id: 5,
        name: 'Regina e Tânia Filmagens Ltda',
        document: '97174374000165',
        state: 'CE',
        city: 'Maracanaú',
        status: CustomerStatus.active
      },
      {
        id: 6,
        name: 'Betina e Clara Informática ME',
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
        name: 'Mariane e Vicente Mudanças Ltda',
        document: '90054224000179',
        state: 'PR',
        city: 'Curitiba',
        status: CustomerStatus.active
      },
    ]
    const products = [
      {
        id: '0001',
        description: 'CELULAR',
        price: 3099.99
      },
      {
        id: '0002',
        description: 'NOTEBOOK',
        price: 5099.99
      },
      {
        id: '0003',
        description: 'TELEVISÃO',
        price: 3099.99
      }
  ]

  const sales: Sales[] = [
    {
      id: 1,
      customerId: 1,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Closed
    },
    {
      id: 2,
      customerId: 2,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Closed
    },
    {
      id: 3,
      customerId: 1,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Closed
    },
    {
      id: 4,
      customerId: 3,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Open
    },
    {
      id: 5,
      customerId: 3,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Closed
    },
    {
      id: 6,
      customerId: 2,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Open
    },
    {
      id: 3,
      customerId: 4,
      paymentMethodId: 1,
      issueDate: new Date(),
      status: SalesStatus.Open
    }
  ]
    const db = { customers, products, sales };
    return of(db).pipe(delay(1300));
  }
}
