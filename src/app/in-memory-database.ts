
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { carriers } from './database/carriers';
import { citys } from './database/citys';
import { contactRelationships } from './database/contact-relationships';
import { contacts } from './database/contacts';
import { customers } from './database/customers';
import { fields } from './database/fields';
import { paymentConditions } from './database/paymentConditions';
import { paymentMethods } from './database/paymentMethods';
import { priceLists } from './database/priceLists';
import { productBalances } from './database/productBalances';
import { products } from './database/products';
import { prospects } from './database/prospects';
import { sales } from './database/sales';
import { salesItems } from './database/salesItems';
import { states } from './database/states';
import { tables } from './database/tables';

import { Seller } from './shared/interfaces/seller';
import { SellerModel } from './shared/model/seller-model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb(
        reqInfo?: RequestInfo | undefined
    ): {} | Observable<{}> | Promise<{}> {

        const sellers: Seller[] = [
            new SellerModel(
                1,
                'Marshall Eriksen',
                11,
                999999999,
                'AV. BRAS LEME, 1020',
                'SÃO PAULO',
                'SP',
                '02511000',
                '26314792894',
                new Date('1978-01-02'),
                'marshall.eriksen@dslabs.com.br'
            )
        ];

        const db = {
            carriers,
            customers,
            fields,
            paymentMethods,
            paymentConditions,
            priceLists,
            productBalances,
            products,
            sales,
            salesItems,
            sellers,
            tables,
            states,
            citys,
            prospects,
            contacts,
            contactRelationships
        };

        return of(db).pipe(delay(1300));
    }
}
