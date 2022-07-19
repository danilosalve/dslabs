import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { Customer } from './pages/my-customers/shared/interface/customer';
import { CustomerStatus } from './pages/my-customers/shared/interface/customer-status.enum';
import { CustomerType } from './pages/my-customers/shared/interface/customer-type';
import { Sales } from './pages/my-sales/shared/interfaces/sales';
import { SalesItems } from './pages/my-sales/shared/interfaces/sales-items';
import { SalesStatus } from './pages/my-sales/shared/interfaces/sales-status.enum';
import { TypeOfFreight } from './pages/my-sales/shared/interfaces/typeOfFreight.enum';
import { Carrier } from './shared/interfaces/carrier';
import { PaymentMethod } from './shared/interfaces/payment-method';
import { PriceList } from './shared/interfaces/price-list/price-list';
import { Product } from './shared/interfaces/product';
import { ProductBalance } from './shared/interfaces/product-balance';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(
    reqInfo?: RequestInfo | undefined
  ): {} | Observable<{}> | Promise<{}> {
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
      {
        id: 6,
        name: 'CLIENTE RETIRA'
      }
    ];

    const customers: Customer[] = [
      {
        id: 1,
        name: 'MADG Marketing ME',
        document: '84696014000181',
        state: 'SP',
        city: 'Bragança Paulista',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      },
      {
        id: 2,
        name: 'Breadcrumb Padaria ME',
        document: '52299624000155',
        state: 'AM',
        city: 'Manaus',
        status: CustomerStatus.active,
        customerType: CustomerType.DEALER,
        registerDate: this.getDateRandom()
      },
      {
        id: 3,
        name: 'Kibaum Alimentos ME',
        document: '41129289000120',
        state: 'MG',
        city: 'Timóteo',
        status: CustomerStatus.active,
        customerType: CustomerType.DEALER,
        registerDate: this.getDateRandom()
      },
      {
        id: 4,
        name: 'Marcenaria do Manuel Ltda',
        document: '23478793000154',
        state: 'MG',
        city: 'Ipatinga',
        status: CustomerStatus.inactive,
        customerType: CustomerType.DEALER,
        registerDate: this.getDateRandom()
      },
      {
        id: 5,
        name: 'CactusMovie Filmagens Ltda',
        document: '97174374000165',
        state: 'CE',
        city: 'Maracanaú',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      },
      {
        id: 6,
        name: 'Três Irmãos Informática ME',
        document: '84870812000188',
        state: 'GO',
        city: 'Luziânia',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      },
      {
        id: 7,
        name: 'Paulo e Aline Tecnologia Ltda',
        document: '80040460000182',
        state: 'SP',
        city: 'São Paulo',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      },
      {
        id: 8,
        name: 'Mudanças Ursinhos Ltda',
        document: '90054224000179',
        state: 'PR',
        city: 'Curitiba',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      },
      {
        id: 9,
        name: 'THOR Ferramentas LTDA',
        document: '78739414000124',
        state: 'SP',
        city: 'São Roque',
        status: CustomerStatus.active,
        customerType: CustomerType.FINAL_COSTUMER,
        registerDate: this.getDateRandom()
      }
    ];

    const paymentMethod: PaymentMethod[] = [
      { id: 1, description: 'A Vista - Dinheiro' },
      { id: 2, description: 'A Vista - Debito' },
      { id: 3, description: 'Credito - A Vista' },
      { id: 4, description: 'PicPay' },
      { id: 5, description: 'Mercado Pago' },
      { id: 6, description: 'Credito - Parcelado' }
    ];

    const priceList: PriceList[] = [
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

    const products: Product[] = [
      {
        id: '0001',
        description: 'ABACATE - KG',
        price: 4.09
      },
      {
        id: '0002',
        description: 'ABACAXI PEROLA - UN',
        price: 4.06
      },
      {
        id: '0003',
        description: 'BANANA NANICA - KG',
        price: 3.49
      },
      {
        id: '0004',
        description: 'BANANA OURO - KG',
        price: 7.49
      },
      {
        id: '0005',
        description: 'BANANA PRATA - KG',
        price: 3.99
      },
      {
        id: '0006',
        description: 'CAQUI RAMA FORTE - KG',
        price: 5.39
      },
      {
        id: '0007',
        description: 'GOIABA BRANCA - KG',
        price: 5.36
      },
      {
        id: '0008',
        description: 'KIWI - BANJERA C/ 6 FRUTAS',
        price: 24.88
      },
      {
        id: '0009',
        description: 'LARANJA BAIA - DUZIA',
        price: 2.79
      },
      {
        id: '0010',
        description: 'LARANJA PERA - DUZIA',
        price: 2.29
      },
      {
        id: '0011',
        description: 'LIMAO TAITI - DUZIA',
        price: 1.79
      },
      {
        id: '0012',
        description: 'MACA NACIONAL FUJI',
        price: 7.49
      },
      {
        id: '0013',
        description: 'MAMAO FORMOSA - UN',
        price: 5.53
      },
      {
        id: '0014',
        description: 'MANGA PALMER - KG',
        price: 4.09
      },
      {
        id: '0015',
        description: 'MARACUJA AZEDO',
        price: 3.73
      },
      {
        id: '0016',
        description: 'MORANGO - CAIXA',
        price: 4.99
      },
      {
        id: '0017',
        description: 'UVA ITALIA - KG',
        price: 7.9
      },
      {
        id: '0018',
        description: 'UVA RUBI - KG',
        price: 10.99
      }
    ];

    const productBalance: ProductBalance[] = [
      {
        id: 1,
        productId: '0001',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 1000,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 2,
        productId: '0002',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 700,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 3,
        productId: '0003',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 904,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 4,
        productId: '0004',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 2706,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 5,
        productId: '0005',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 2022,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 6,
        productId: '0006',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 601,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 7,
        productId: '0007',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 276,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 8,
        productId: '0008',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 2001,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 9,
        productId: '0009',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 205,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 10,
        productId: '0010',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 201,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 11,
        productId: '0011',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 300,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 12,
        productId: '0012',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 400,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 13,
        productId: '0013',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 199,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 14,
        productId: '0014',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 300,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 15,
        productId: '0015',
        warehouse: '01',
        warehouseDescription: 'CD SP',
        availablequantity: 400,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 16,
        productId: '0001',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 822,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 17,
        productId: '0002',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 1152,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 18,
        productId: '0003',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 52,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 19,
        productId: '0004',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 11,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 20,
        productId: '0005',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 12,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 21,
        productId: '0006',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 990,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 22,
        productId: '0007',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 100,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 23,
        productId: '0008',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 300,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 24,
        productId: '0009',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 15,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 25,
        productId: '0010',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 20,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 26,
        productId: '0011',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 33,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 27,
        productId: '0012',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 500,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 28,
        productId: '0013',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 227,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 29,
        productId: '0014',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 150,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      },
      {
        id: 30,
        productId: '0015',
        warehouse: '02',
        warehouseDescription: 'CD CAMPINAS',
        availablequantity: 10,
        allocatedquantity: 0,
        expectedinflow: 0,
        orderquantity: 0
      }
    ];

    const sales: Sales[] = [
      {
        id: 1,
        customerId: 1,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 1,
        priceListId: 1,
        status: SalesStatus.Closed,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 2,
        customerId: 2,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 1,
        priceListId: undefined,
        status: SalesStatus.Closed,
        typeOfFreight: TypeOfFreight.FOB
      },
      {
        id: 3,
        customerId: 1,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 5,
        priceListId: 1,
        status: SalesStatus.Closed,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 4,
        customerId: 8,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 2,
        priceListId: 1,
        status: SalesStatus.Blocked,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 5,
        customerId: 3,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 4,
        priceListId: 1,
        status: SalesStatus.Open,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 6,
        customerId: 3,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 3,
        priceListId: 1,
        status: SalesStatus.Closed,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 7,
        customerId: 2,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 2,
        priceListId: 1,
        status: SalesStatus.Open,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 8,
        customerId: 4,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 2,
        priceListId: 1,
        status: SalesStatus.Blocked,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 9,
        customerId: 5,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 2,
        priceListId: 1,
        status: SalesStatus.Open,
        typeOfFreight: TypeOfFreight.CIF
      },
      {
        id: 10,
        customerId: 6,
        paymentMethodId: 1,
        issueDate: this.getDateRandom(),
        carrierId: 6,
        priceListId: 1,
        status: SalesStatus.Open,
        discount: 2,
        typeOfFreight: TypeOfFreight.SEMFRETE
      },
      {
        id: 11,
        customerId: 9,
        paymentMethodId: 3,
        issueDate: this.getDateRandom(),
        carrierId: 2,
        priceListId: 1,
        status: SalesStatus.Open,
        discount: 2,
        typeOfFreight: TypeOfFreight.SEMFRETE,
        expenses: 10.49,
        insurance: 44.9,
        freight: 200.9
      }
    ];

    const salesItems: SalesItems[] = [
      {
        id: 1,
        salesId: 1,
        itemId: 1,
        productId: '0001',
        value: 4.09,
        quantity: 2,
        amount: 8.18,
        productName: '',
        discount: 0
      },
      {
        id: 2,
        salesId: 1,
        itemId: 2,
        productId: '0002',
        value: 4.06,
        quantity: 1,
        amount: 4.06,
        productName: '',
        discount: 0
      },
      {
        id: 3,
        salesId: 1,
        itemId: 3,
        productId: '0003',
        value: 3.49,
        quantity: 3,
        amount: 10.47,
        productName: '',
        discount: 0
      },
      {
        id: 4,
        salesId: 1,
        itemId: 4,
        productId: '0014',
        value: 3.73,
        quantity: 3,
        amount: 11.19,
        productName: '',
        discount: 0
      },
      {
        id: 5,
        salesId: 2,
        itemId: 1,
        productId: '0001',
        value: 4.09,
        quantity: 12,
        amount: 49.08,
        productName: '',
        discount: 0
      },
      {
        id: 6,
        salesId: 2,
        itemId: 2,
        productId: '0005',
        value: 3.99,
        quantity: 2,
        amount: 7.98,
        productName: '',
        discount: 0
      },
      {
        id: 7,
        salesId: 2,
        itemId: 3,
        productId: '0002',
        value: 4.06,
        quantity: 6,
        amount: 24.36,
        productName: '',
        discount: 0
      },
      {
        id: 8,
        salesId: 3,
        itemId: 1,
        productId: '0003',
        value: 3.49,
        quantity: 7,
        amount: 24.43,
        productName: '',
        discount: 0
      },
      {
        id: 9,
        salesId: 3,
        itemId: 2,
        productId: '0010',
        value: 2.29,
        quantity: 5,
        amount: 11.45,
        productName: '',
        discount: 0
      },
      {
        id: 10,
        salesId: 3,
        itemId: 3,
        productId: '0004',
        value: 7.49,
        quantity: 1,
        amount: 7.49,
        productName: '',
        discount: 0
      },
      {
        id: 11,
        salesId: 4,
        itemId: 1,
        productId: '0001',
        value: 4.09,
        quantity: 10,
        amount: 40.9,
        productName: '',
        discount: 0
      },
      {
        id: 12,
        salesId: 4,
        itemId: 2,
        productId: '0004',
        value: 7.49,
        quantity: 1,
        amount: 7.49,
        productName: '',
        discount: 0
      },
      {
        id: 13,
        salesId: 4,
        itemId: 3,
        productId: '0006',
        value: 5.39,
        quantity: 2,
        amount: 10.78,
        productName: '',
        discount: 0
      },
      {
        id: 14,
        salesId: 4,
        itemId: 4,
        productId: '0008',
        value: 24.88,
        quantity: 1,
        amount: 24.8,
        productName: '',
        discount: 0
      },
      {
        id: 15,
        salesId: 4,
        itemId: 5,
        productId: '0010',
        value: 2.29,
        quantity: 1,
        amount: 2.29,
        productName: '',
        discount: 0
      },
      {
        id: 16,
        salesId: 4,
        itemId: 6,
        productId: '0011',
        value: 1.79,
        quantity: 3,
        amount: 5.37,
        productName: '',
        discount: 0
      },
      {
        id: 17,
        salesId: 4,
        itemId: 7,
        productId: '0014',
        value: 4.09,
        quantity: 4,
        amount: 16.36,
        productName: '',
        discount: 0
      },
      {
        id: 18,
        salesId: 4,
        itemId: 8,
        productId: '0016',
        value: 4.99,
        quantity: 5,
        amount: 24.95,
        productName: '',
        discount: 0
      },
      {
        id: 19,
        salesId: 4,
        itemId: 9,
        productId: '0017',
        value: 7.9,
        quantity: 2,
        amount: 15.8,
        productName: '',
        discount: 0
      },
      {
        id: 20,
        salesId: 4,
        itemId: 10,
        productId: '0018',
        value: 10.99,
        quantity: 1,
        amount: 10.99,
        productName: '',
        discount: 0
      },
      {
        id: 21,
        salesId: 4,
        itemId: 12,
        productId: '0003',
        value: 3.49,
        quantity: 1,
        amount: 3.49,
        productName: '',
        discount: 0
      },
      {
        id: 22,
        salesId: 4,
        itemId: 13,
        productId: '0002',
        value: 4.06,
        quantity: 12,
        amount: 48.72,
        productName: '',
        discount: 0
      },
      {
        id: 23,
        salesId: 5,
        itemId: 1,
        productId: '0003',
        value: 3.49,
        quantity: 8,
        amount: 27.92,
        productName: '',
        discount: 0
      },
      {
        id: 24,
        salesId: 5,
        itemId: 2,
        productId: '0002',
        value: 4.06,
        quantity: 6,
        amount: 24.36,
        productName: '',
        discount: 0
      },
      {
        id: 25,
        salesId: 5,
        itemId: 3,
        productId: '0012',
        value: 7.49,
        quantity: 4,
        amount: 29.96,
        productName: '',
        discount: 0
      },
      {
        id: 26,
        salesId: 5,
        itemId: 4,
        productId: '0016',
        value: 4.99,
        quantity: 3,
        amount: 14.97,
        productName: '',
        discount: 0
      },
      {
        id: 27,
        salesId: 5,
        itemId: 1,
        productId: '0017',
        value: 7.9,
        quantity: 2,
        amount: 15.8,
        productName: '',
        discount: 0
      },
      {
        id: 28,
        salesId: 6,
        itemId: 1,
        productId: '0001',
        value: 4.09,
        quantity: 5,
        amount: 20.45,
        productName: '',
        discount: 0
      },
      {
        id: 29,
        salesId: 6,
        itemId: 2,
        productId: '0007',
        value: 5.36,
        quantity: 2,
        amount: 10.72,
        productName: '',
        discount: 0
      },
      {
        id: 30,
        salesId: 7,
        itemId: 1,
        productId: '0002',
        value: 4.06,
        quantity: 3,
        amount: 12.18,
        productName: '',
        discount: 0
      },
      {
        id: 31,
        salesId: 7,
        itemId: 2,
        productId: '0001',
        value: 4.09,
        quantity: 5,
        amount: 20.45,
        productName: '',
        discount: 0
      },
      {
        id: 32,
        salesId: 8,
        itemId: 1,
        productId: '0002',
        value: 10.99,
        quantity: 3,
        amount: 32.97,
        productName: '',
        discount: 0
      },
      {
        id: 33,
        salesId: 8,
        itemId: 2,
        productId: '0015',
        value: 3.73,
        quantity: 3,
        amount: 11.19,
        productName: '',
        discount: 0
      },
      {
        id: 34,
        salesId: 9,
        itemId: 1,
        productId: '0018',
        value: 10.99,
        quantity: 3,
        amount: 32.97,
        productName: '',
        discount: 0
      },
      {
        id: 35,
        salesId: 10,
        itemId: 1,
        productId: '0005',
        value: 3.99,
        quantity: 3,
        amount: 11.97,
        productName: '',
        discount: 10
      },
      {
        id: 36,
        salesId: 10,
        itemId: 2,
        productId: '0006',
        value: 5.39,
        quantity: 1,
        amount: 5.39,
        productName: '',
        discount: 0
      },
      {
        id: 37,
        salesId: 10,
        itemId: 3,
        productId: '0007',
        value: 5.36,
        quantity: 3,
        amount: 37.52,
        productName: '',
        discount: 0
      },
      {
        id: 38,
        salesId: 11,
        itemId: 1,
        productId: '0018',
        value: 10.99,
        quantity: 50,
        amount: 549.5,
        productName: '',
        discount: 5
      },
      {
        id: 39,
        salesId: 11,
        itemId: 2,
        productId: '0002',
        value: 4.06,
        quantity: 500,
        amount: 2030,
        productName: '',
        discount: 0
      }
    ];
    const db = {
      carriers,
      customers,
      paymentMethod,
      priceList,
      productBalance,
      products,
      sales,
      salesItems
    };

    return of(db).pipe(delay(1300));
  }

  getDateRandom(): Date {
    const year = new Date().getFullYear();
    const dateIni = new Date(`${year}-01-01`);
    const dateEnd = new Date();
    const diff =  dateEnd.getTime() - dateIni.getTime();
    return new Date(dateIni.getTime() + (diff * Math.random()));
  }

}
