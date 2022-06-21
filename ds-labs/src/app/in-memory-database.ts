import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
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
    const db = { products };
    return of(db).pipe(delay(1300));
  }
}
