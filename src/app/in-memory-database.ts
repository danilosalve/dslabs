import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { delay, Observable, of } from 'rxjs';
import { Customer } from './pages/my-customers/shared/interface/customer';
import { CustomerStatus } from './pages/my-customers/shared/interface/customer-status.enum';
import { CustomerType } from './pages/my-customers/shared/interface/customer-type';
import { Product } from './pages/my-products/shared/interface/product';
import { Sales } from './pages/my-sales/shared/interfaces/sales';
import { SalesItems } from './pages/my-sales/shared/interfaces/sales-items';
import { SalesStatus } from './pages/my-sales/shared/interfaces/sales-status.enum';
import { TypeOfFreight } from './pages/my-sales/shared/interfaces/typeOfFreight.enum';
import { Field } from './pages/my-settings/shared/interfaces/field';
import { FieldType } from './pages/my-settings/shared/interfaces/field-type.enum';
import { Table } from './pages/my-settings/shared/interfaces/table';
import { TableStatus } from './pages/my-settings/shared/interfaces/table-status.enum';
import { Carrier } from './shared/interfaces/carrier';
import { PaymentCondition } from './shared/interfaces/payment-condition';
import { PaymentMethod } from './shared/interfaces/payment-method';
import { PriceList } from './shared/interfaces/price-list/price-list';
import { ProductBalance } from './shared/interfaces/product-balance';
import { Seller } from './shared/interfaces/seller';
import { SellerModel } from './shared/model/seller.model';

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
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Avenida João Alberto Ahnert, 955',
                neighborhood: 'Jardim Águas Claras',
                zipCode: '12929070'
            },
            {
                id: 2,
                name: 'Breadcrumb Padaria ME',
                document: '52299624000155',
                state: 'AM',
                city: 'Manaus',
                status: CustomerStatus.active,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Praia Canoa Quebrada, 740',
                neighborhood: 'Tarumã',
                zipCode: '69041360'
            },
            {
                id: 3,
                name: 'Kibaum Alimentos ME',
                document: '41129289000120',
                state: 'MG',
                city: 'Timóteo',
                status: CustomerStatus.active,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Sapoti, 802',
                neighborhood: 'Nova Esperança',
                zipCode: '35181102'
            },
            {
                id: 4,
                name: 'Marcenaria do Manuel Ltda',
                document: '23478793000154',
                state: 'MG',
                city: 'Ipatinga',
                status: CustomerStatus.inactive,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Gênova, 1000',
                neighborhood: 'Bethânia',
                zipCode: '35164055'
            },
            {
                id: 5,
                name: 'CactusMovie Filmagens Ltda',
                document: '97174374000165',
                state: 'CE',
                city: 'Maracanaú',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua 10, 796',
                neighborhood: 'Jarí',
                zipCode: '61916060'
            },
            {
                id: 6,
                name: 'Três Irmãos Informática ME',
                document: '84870812000188',
                state: 'GO',
                city: 'Luziânia',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Quadra Quadra 94, 206',
                neighborhood: 'Mansões de Recreio',
                zipCode: '72809470'
            },
            {
                id: 7,
                name: 'Paulo e Aline Tecnologia Ltda',
                document: '80040460000182',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Luiza Campanella Giordano, 799',
                neighborhood: 'Pq Paineiras',
                zipCode: '03694180'
            },
            {
                id: 8,
                name: 'Mudanças Ursinhos Ltda',
                document: '90054224000179',
                state: 'PR',
                city: 'Curitiba',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Prof. Maria Balbina C Dias, 283',
                neighborhood: 'Boa Vista',
                zipCode: '82560305'
            },
            {
                id: 9,
                name: 'THOR Ferramentas LTDA',
                document: '78739414000124',
                state: 'SP',
                city: 'São Roque',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Mariko Karube, 112',
                neighborhood: 'Caete (Mailasqui)',
                zipCode: '18143301'
            },
            {
                id: 10,
                name: 'Beatriz Lúcia Sebastiana da Costa',
                document: '79590029833',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Douglas Moreno dos Santos, 996',
                neighborhood: 'Jd. Aurélio',
                zipCode: '05857245'
            },
            {
                id: 11,
                name: 'Carlos Heitor Miguel Baptista',
                document: '45633994850',
                state: 'SP',
                city: 'Águas de São Pedro',
                status: CustomerStatus.active,
                customerType: CustomerType.RURAL_PRODUCER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Avenida Washington Luís, 539',
                neighborhood: 'Vila Congonhas',
                zipCode: '04626911'
            },
            {
                id: 12,
                name: 'Anderson Kauê Heitor Lopes',
                document: '99823412863',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Travessa Almarjão, 677',
                neighborhood: 'Vila Maria Alta',
                zipCode: '02136050'
            },
            {
                id: 13,
                name: 'Luís Renato Pedro Ribeiro',
                document: '58167534871',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Barão de Calera, 659',
                neighborhood: 'Parque Cruzeiro do Sul',
                zipCode: '08070050'
            },
            {
                id: 14,
                name: 'Jennifer Vera Pereira',
                document: '26107997806',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Viaduto Diario Popular, 242',
                neighborhood: 'Centro',
                zipCode: '01015090'
            },
            {
                id: 15,
                name: 'Benedita Isabelly Moraes',
                document: '77998490888',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Jesuíno Antônio Batista, 877',
                neighborhood: 'Jardim Guarani',
                zipCode: '02851080'
            },
            {
                id: 16,
                name: 'Eduarda Sandra Sabrina Nogueira',
                document: '04452686893',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Viela da Esperança, 119',
                neighborhood: 'Fazenda da Juta',
                zipCode: '03977470'
            },
            {
                id: 17,
                name: 'Augusto e Mariane Contábil ME',
                document: '16639016000189',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Uberlândia, 475',
                neighborhood: 'Vila Polopoli',
                zipCode: '05365040'
            },
            {
                id: 18,
                name: 'Sacolão -  Meu pé de Laranja Lima',
                document: '01112463000108',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Clamecy, 144',
                neighborhood: 'Estância Mirim',
                zipCode: '04943060'
            },
            {
                id: 19,
                name: 'Betina Lorena Drumond',
                document: '81107387884',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.FINAL_COSTUMER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Parapuã, 496',
                neighborhood: 'Itaberaba',
                zipCode: '02831001'
            },
            {
                id: 20,
                name: 'Pães e Doces Dona Florinda',
                document: '34971954000163',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Eulália Bastos, 221',
                neighborhood: 'Tucuruvi',
                zipCode: '02303020'
            },
            {
                id: 21,
                name: 'Luiza e Maitê Restaurante ME',
                document: '43571746000168',
                state: 'SP',
                city: 'São Paulo',
                status: CustomerStatus.active,
                customerType: CustomerType.DEALER,
                registerDate: this.getDateRandom(),
                lastPurchase: this.getDateRandom(),
                address: 'Rua Baltazar Pereira, 128',
                neighborhood: 'Jardim Regina',
                zipCode: '05175340'
            }
        ];

        const paymentConditions: PaymentCondition[] = [
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

        const paymentMethod: PaymentMethod[] = [
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
                price: 4.09,
                unitOfMeasurement: 'KG',
                photo: 'abacate.png',
                group: 'Frutas'
            },
            {
                id: '0002',
                description: 'ABACAXI PEROLA - UN',
                price: 4.06,
                unitOfMeasurement: 'UN',
                photo: 'abacaxi.png',
                group: 'Frutas'
            },
            {
                id: '0003',
                description: 'BANANA NANICA - KG',
                price: 3.49,
                unitOfMeasurement: 'KG',
                photo: 'banana.png',
                group: 'Frutas'
            },
            {
                id: '0004',
                description: 'BANANA OURO - KG',
                price: 7.49,
                unitOfMeasurement: 'KG',
                photo: 'banana.png',
                group: 'Frutas'
            },
            {
                id: '0005',
                description: 'BANANA PRATA - KG',
                price: 3.99,
                unitOfMeasurement: 'KG',
                photo: 'banana.png',
                group: 'Frutas'
            },
            {
                id: '0006',
                description: 'CAQUI RAMA FORTE - KG',
                price: 5.39,
                unitOfMeasurement: 'KG',
                photo: 'caqui.png',
                group: 'Frutas'
            },
            {
                id: '0007',
                description: 'GOIABA BRANCA - KG',
                price: 5.36,
                unitOfMeasurement: 'KG',
                photo: 'goiaba.png',
                group: 'Frutas'
            },
            {
                id: '0008',
                description: 'KIWI - BANJEJA C/ 6 FRUTAS',
                price: 24.88,
                unitOfMeasurement: 'BJ',
                photo: 'kiwi.png',
                group: 'Frutas'
            },
            {
                id: '0009',
                description: 'LARANJA BAIA - DUZIA',
                price: 2.79,
                unitOfMeasurement: 'DZ',
                photo: 'laranja.png',
                group: 'Frutas'
            },
            {
                id: '0010',
                description: 'LARANJA PERA - DUZIA',
                price: 2.29,
                unitOfMeasurement: 'DZ',
                photo: 'laranja.png',
                group: 'Frutas'
            },
            {
                id: '0011',
                description: 'LIMAO TAITI - DUZIA',
                price: 1.79,
                unitOfMeasurement: 'DZ',
                photo: 'limao.png',
                group: 'Frutas'
            },
            {
                id: '0012',
                description: 'MACA NACIONAL FUJI',
                price: 7.49,
                unitOfMeasurement: 'KG',
                photo: 'maca.png',
                group: 'Frutas'
            },
            {
                id: '0013',
                description: 'MAMAO FORMOSA - UN',
                price: 5.53,
                unitOfMeasurement: 'UN',
                photo: 'mamao.png',
                group: 'Frutas'
            },
            {
                id: '0014',
                description: 'MANGA PALMER - KG',
                price: 4.09,
                unitOfMeasurement: 'KG',
                photo: 'manga.png',
                group: 'Frutas'
            },
            {
                id: '0015',
                description: 'MARACUJA AZEDO',
                price: 3.73,
                unitOfMeasurement: 'KG',
                photo: 'maracuja.png',
                group: 'Frutas'
            },
            {
                id: '0016',
                description: 'MORANGO - CAIXA',
                price: 4.99,
                unitOfMeasurement: 'CX',
                photo: 'morango.png',
                group: 'Frutas'
            },
            {
                id: '0017',
                description: 'UVA ITALIA - KG',
                price: 7.9,
                unitOfMeasurement: 'KG',
                photo: 'uva_italia.png',
                group: 'Frutas'
            },
            {
                id: '0018',
                description: 'UVA RUBI - KG',
                price: 10.99,
                unitOfMeasurement: 'KG',
                photo: 'uva.png',
                group: 'Frutas'
            },
            {
                id: '0019',
                description: 'PITAYA VERMELHA - UN',
                price: 15.9,
                unitOfMeasurement: 'UN',
                photo: 'pitaya.png',
                group: 'Frutas'
            },
            {
                id: '0020',
                description: 'ACEROLA - KG',
                price: 7.73,
                unitOfMeasurement: 'KG',
                photo: 'acerola.png',
                group: 'Frutas'
            },
            {
                id: '0021',
                description: 'GRAVIOLA - UN',
                price: 115.99,
                unitOfMeasurement: 'UN',
                photo: 'graviola.png',
                group: 'Frutas'
            },
            {
                id: '0022',
                description: 'COCO SECO UN - 640g',
                price: 5.11,
                unitOfMeasurement: 'UN',
                photo: 'coco.png',
                group: 'Frutas'
            },
            {
                id: '0023',
                description: 'JABUTICABA - KG',
                price: 23.03,
                unitOfMeasurement: 'KG',
                photo: 'jabuticaba.png',
                group: 'Frutas'
            },
            {
                id: '0024',
                description: 'ALFACE AMERICANO',
                price: 4.26,
                unitOfMeasurement: 'UN',
                photo: 'alface.png',
                group: 'Verduras'
            },
            {
                id: '0025',
                description: 'ALFACE ROXA',
                price: 4.47,
                unitOfMeasurement: 'UN',
                photo: 'repolho-roxo.png',
                group: 'Verduras'
            },
            {
                id: '0026',
                description: 'ALFACE CRESPA',
                price: 1.8,
                unitOfMeasurement: 'UN',
                photo: 'alface.png',
                group: 'Verduras'
            },
            {
                id: '0027',
                description: 'COENTRO',
                price: 2.29,
                unitOfMeasurement: 'PC',
                photo: 'salsa.png',
                group: 'Verduras'
            },
            {
                id: '0028',
                description: 'CEBOLINHA',
                price: 1.79,
                unitOfMeasurement: 'UN',
                photo: 'cebolinha.png',
                group: 'Verduras'
            },
            {
                id: '0029',
                description: 'SALSA',
                price: 1.99,
                unitOfMeasurement: 'PC',
                photo: 'salsa.png',
                group: 'Verduras'
            },
            {
                id: '0030',
                description: 'RUCULA',
                price: 3.79,
                unitOfMeasurement: 'PC',
                photo: 'rucula.png',
                group: 'Verduras'
            },
            {
                id: '0031',
                description: 'AGRIÃO',
                price: 3.49,
                unitOfMeasurement: 'PC',
                photo: 'agriao.png',
                group: 'Verduras'
            },
            {
                id: '0032',
                description: 'COUVE MANTEIGA',
                price: 3.99,
                unitOfMeasurement: 'PC',
                photo: 'espinafre.png',
                group: 'Verduras'
            },
            {
                id: '0033',
                description: 'ESPINAFRE',
                price: 4.99,
                unitOfMeasurement: 'PC',
                photo: 'espinafre.png',
                group: 'Verduras'
            },
            {
                id: '0034',
                description: 'BATATA LAVADA',
                price: 3.99,
                unitOfMeasurement: 'KG',
                photo: 'batata.png',
                group: 'Legumes'
            },
            {
                id: '0035',
                description: 'CENOURA',
                price: 2.7,
                unitOfMeasurement: 'KG',
                photo: 'cenoura.png',
                group: 'Legumes'
            },
            {
                id: '0036',
                description: 'CEBOLA',
                price: 6.38,
                unitOfMeasurement: 'KG',
                photo: 'cebola.png',
                group: 'Legumes'
            },
            {
                id: '0037',
                description: 'TOMATE',
                price: 3.59,
                unitOfMeasurement: 'KG',
                photo: 'tomate.png',
                group: 'Legumes'
            },
            {
                id: '0038',
                description: 'PERA',
                price: 8.5,
                unitOfMeasurement: 'KG',
                photo: 'pera.png',
                group: 'Frutas'
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
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 31,
                productId: '0016',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 32,
                productId: '0016',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 33,
                productId: '0017',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 34,
                productId: '0017',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 35,
                productId: '0018',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 36,
                productId: '0018',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 37,
                productId: '0019',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 38,
                productId: '0019',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 39,
                productId: '0020',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 40,
                productId: '0020',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 41,
                productId: '0021',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 42,
                productId: '0021',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 43,
                productId: '0022',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 44,
                productId: '0022',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 45,
                productId: '0023',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 46,
                productId: '0023',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 47,
                productId: '0024',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 48,
                productId: '0025',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 49,
                productId: '0026',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 50,
                productId: '0026',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 51,
                productId: '0027',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 52,
                productId: '0027',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 53,
                productId: '0028',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 54,
                productId: '0028',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 55,
                productId: '0029',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 56,
                productId: '0029',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 57,
                productId: '0030',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 58,
                productId: '0030',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 59,
                productId: '0031',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 60,
                productId: '0031',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 61,
                productId: '0032',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 62,
                productId: '0032',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 63,
                productId: '0033',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 64,
                productId: '0033',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 65,
                productId: '0034',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 66,
                productId: '0034',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 67,
                productId: '0035',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 67,
                productId: '0035',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 68,
                productId: '0036',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 68,
                productId: '0036',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 61,
                productId: '0037',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 62,
                productId: '0037',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 61,
                productId: '0038',
                warehouse: '01',
                warehouseDescription: 'CD SP',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
                allocatedquantity: 0,
                expectedinflow: 0,
                orderquantity: 0
            },
            {
                id: 62,
                productId: '0038',
                warehouse: '02',
                warehouseDescription: 'CD CAMPINAS',
                availablequantity: Number.parseInt((Math.random() * 1000).toFixed()),
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
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 24, 12),
                carrierId: 1,
                priceListId: 1,
                status: SalesStatus.Closed,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 0
            },
            {
                id: 2,
                customerId: 2,
                paymentMethodId: 3,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 20, 1),
                carrierId: 1,
                priceListId: undefined,
                status: SalesStatus.Closed,
                typeOfFreight: TypeOfFreight.FOB,
                comment: '',
                discount: 10,
                expenses: 0,
                insurance: 0,
                freight: 79.94
            },
            {
                id: 3,
                customerId: 1,
                paymentMethodId: 2,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 1, 3),
                carrierId: 5,
                priceListId: 1,
                status: SalesStatus.Closed,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 0
            },
            {
                id: 4,
                customerId: 8,
                paymentMethodId: 3,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 4, 3),
                carrierId: 2,
                priceListId: 1,
                status: SalesStatus.Blocked,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 0
            },
            {
                id: 5,
                customerId: 3,
                paymentMethodId: 1,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 27, 4),
                carrierId: 4,
                priceListId: 1,
                status: SalesStatus.Open,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 127.84
            },
            {
                id: 6,
                customerId: 3,
                paymentMethodId: 2,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 14, 5),
                carrierId: 3,
                priceListId: 1,
                status: SalesStatus.Closed,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 300.47
            },
            {
                id: 7,
                customerId: 2,
                paymentMethodId: 1,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 13, 6),
                carrierId: 2,
                priceListId: 1,
                status: SalesStatus.Open,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 10.9,
                expenses: 0,
                insurance: 0,
                freight: 10.9
            },
            {
                id: 8,
                customerId: 4,
                paymentMethodId: 2,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 23, 8),
                carrierId: 2,
                priceListId: 1,
                status: SalesStatus.Blocked,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 19.9,
                expenses: 0,
                insurance: 0,
                freight: 179.39
            },
            {
                id: 9,
                customerId: 5,
                paymentMethodId: 3,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 1, 9),
                carrierId: 2,
                priceListId: 1,
                status: SalesStatus.Open,
                typeOfFreight: TypeOfFreight.CIF,
                comment: '',
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 0
            },
            {
                id: 10,
                customerId: 6,
                paymentMethodId: 1,
                paymentConditionsId: 1,
                issueDate: this.getDateRandom(false, 7, 9),
                carrierId: 6,
                priceListId: 1,
                status: SalesStatus.Open,
                discount: 0,
                expenses: 0,
                insurance: 0,
                freight: 0,
                typeOfFreight: TypeOfFreight.SEMFRETE,
                comment: ''
            },
            {
                id: 11,
                customerId: 9,
                paymentMethodId: 6,
                paymentConditionsId: 2,
                issueDate: this.getDateRandom(false, 12, 10),
                carrierId: 2,
                priceListId: 1,
                status: SalesStatus.Open,
                discount: 0,
                typeOfFreight: TypeOfFreight.SEMFRETE,
                expenses: 0,
                insurance: 59.9,
                freight: 179.9,
                comment: ''
            },
            {
                id: 12,
                customerId: 20,
                paymentMethodId: 7,
                paymentConditionsId: 3,
                issueDate: this.getDateRandom(false, 13, 10),
                carrierId: 5,
                priceListId: 1,
                status: SalesStatus.Closed,
                discount: 2,
                typeOfFreight: TypeOfFreight.CIF,
                expenses: 79.98,
                insurance: 499.97,
                freight: 398.9,
                comment: ''
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
                quantity: 90,
                amount: 368.1,
                productName: '',
                discount: 0
            },
            {
                id: 6,
                salesId: 2,
                itemId: 2,
                productId: '0005',
                value: 3.99,
                quantity: 400,
                amount: 1596,
                productName: '',
                discount: 0
            },
            {
                id: 7,
                salesId: 2,
                itemId: 3,
                productId: '0002',
                value: 4.06,
                quantity: 35,
                amount: 142.1,
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
                quantity: 129,
                amount: 450.21,
                productName: '',
                discount: 0
            },
            {
                id: 24,
                salesId: 5,
                itemId: 2,
                productId: '0002',
                value: 4.06,
                quantity: 77,
                amount: 312.62,
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
                quantity: 10,
                amount: 40.6,
                productName: '',
                discount: 0
            },
            {
                id: 31,
                salesId: 7,
                itemId: 2,
                productId: '0001',
                value: 4.09,
                quantity: 30,
                amount: 122.7,
                productName: '',
                discount: 0
            },
            {
                id: 32,
                salesId: 8,
                itemId: 1,
                productId: '0002',
                value: 4.06,
                quantity: 47,
                amount: 190.82,
                productName: '',
                discount: 0
            },
            {
                id: 33,
                salesId: 8,
                itemId: 2,
                productId: '0015',
                value: 3.73,
                quantity: 49,
                amount: 182.77,
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
            },
            {
                id: 40,
                salesId: 12,
                itemId: 1,
                productId: '0021',
                value: 115.99,
                quantity: 200,
                amount: 23198,
                productName: '',
                discount: 2
            },
            {
                id: 41,
                salesId: 12,
                itemId: 2,
                productId: '0008',
                value: 24.88,
                quantity: 25,
                amount: 622,
                productName: '',
                discount: 0
            },
            {
                id: 42,
                salesId: 12,
                itemId: 3,
                productId: '0020',
                value: 7.73,
                quantity: 100,
                amount: 773,
                productName: '',
                discount: 0
            },
            {
                id: 43,
                salesId: 12,
                itemId: 4,
                productId: '0024',
                value: 4.26,
                quantity: 50,
                amount: 213,
                productName: '',
                discount: 0
            },
            {
                id: 44,
                salesId: 12,
                itemId: 5,
                productId: '0013',
                value: 5.53,
                quantity: 12,
                amount: 66.33,
                productName: '',
                discount: 0
            },
            {
                id: 45,
                salesId: 12,
                itemId: 6,
                productId: '0023',
                value: 23.03,
                quantity: 500,
                amount: 11515,
                productName: '',
                discount: 0
            },
            {
                id: 45,
                salesId: 2,
                itemId: 4,
                productId: '0037',
                value: 3.59,
                quantity: 500,
                amount: 1795,
                productName: '',
                discount: 0
            },
            {
                id: 46,
                salesId: 2,
                itemId: 5,
                productId: '0024',
                value: 4.26,
                quantity: 79,
                amount: 336.54,
                productName: '',
                discount: 0
            },
            {
                id: 46,
                salesId: 8,
                itemId: 3,
                productId: '0032',
                value: 3.99,
                quantity: 96,
                amount: 383.04,
                productName: '',
                discount: 0.5
            },
            {
                id: 47,
                salesId: 7,
                itemId: 3,
                productId: '0037',
                value: 3.59,
                quantity: 12.5,
                amount: 44.875,
                productName: '',
                discount: 0
            },
            {
                id: 48,
                salesId: 7,
                itemId: 4,
                productId: '0034',
                value: 3.99,
                quantity: 300,
                amount: 1197,
                productName: '',
                discount: 0
            },
            {
                id: 49,
                salesId: 7,
                itemId: 5,
                productId: '0024',
                value: 4.26,
                quantity: 50,
                amount: 213,
                productName: '',
                discount: 0
            }
        ];

        const tables: Table[] = [
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

        const fields: Field[] = [
            {
                id: 1,
                tableId: 1,
                field: 'id',
                label: 'Código',
                description: 'Código do Cliente',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 2,
                tableId: 1,
                field: 'name',
                label: 'Nome',
                description: 'Nome/Razão Social do Cliente',
                type: FieldType.STRING,
                lenght: 20,
                decimal: 0
            },
            {
                id: 3,
                tableId: 1,
                field: 'document',
                label: 'CPF/CNPJ',
                description: 'CPF/CNPJ',
                type: FieldType.STRING,
                lenght: 14,
                decimal: 0
            },
            {
                id: 4,
                tableId: 1,
                field: 'state',
                label: 'UF',
                description: 'Estado/Unidade Federativa',
                type: FieldType.STRING,
                lenght: 2,
                decimal: 0
            },
            {
                id: 5,
                tableId: 1,
                field: 'city',
                label: 'Municipio',
                description: 'Cidade/Municipio',
                type: FieldType.STRING,
                lenght: 20,
                decimal: 0
            },
            {
                id: 6,
                tableId: 1,
                field: 'status',
                label: 'Status',
                description: 'Status do Cliente',
                type: FieldType.STRING,
                lenght: 1,
                decimal: 0
            },
            {
                id: 7,
                tableId: 1,
                field: 'customerType',
                label: 'Tipo',
                description: 'Tipo do Cliente',
                type: FieldType.STRING,
                lenght: 1,
                decimal: 0
            },
            {
                id: 8,
                tableId: 1,
                field: 'registerDate',
                label: 'Dt. Nasc/Registro',
                description: 'Data de Nascimento/Registro',
                type: FieldType.DATE,
                lenght: 8,
                decimal: 0
            },
            {
                id: 9,
                tableId: 5,
                field: 'id',
                label: 'Código',
                description: 'Código do Produto',
                type: FieldType.STRING,
                lenght: 4,
                decimal: 0
            },
            {
                id: 10,
                tableId: 5,
                field: 'description',
                label: 'Descrição',
                description: 'Descrição genérica do Produto',
                type: FieldType.STRING,
                lenght: 30,
                decimal: 0
            },
            {
                id: 11,
                tableId: 5,
                field: 'price',
                label: 'Preço Unitário',
                description: 'Valor unitário do Produto',
                type: FieldType.NUMBER,
                lenght: 16,
                decimal: 2
            },
            {
                id: 12,
                tableId: 7,
                field: 'id',
                label: 'Cód. Pedido',
                description: 'Código do Pedido de venda',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 13,
                tableId: 7,
                field: 'customerId',
                label: 'Cód. Cliente',
                description: 'Código do Cliente',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 14,
                tableId: 7,
                field: 'issueDate',
                label: 'Dt. Emissão',
                description: 'Data de emissão do Pedido',
                type: FieldType.DATE,
                lenght: 8,
                decimal: 0
            },
            {
                id: 15,
                tableId: 7,
                field: 'carrierId',
                label: 'Cód. Transportadora',
                description: 'Código da Transportadora',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 16,
                tableId: 7,
                field: 'priceListId',
                label: 'Cód. Tab. Preço',
                description: 'Código da Tabela de preço',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 17,
                tableId: 8,
                field: 'salesId',
                label: 'Cód. Pedido',
                description: 'Código do Pedido de venda',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 18,
                tableId: 8,
                field: 'itemId',
                label: 'Item',
                description: 'Número do Item',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 19,
                tableId: 8,
                field: 'productId',
                label: 'Cód. Produto',
                description: 'Código do Produto',
                type: FieldType.STRING,
                lenght: 15,
                decimal: 0
            },
            {
                id: 20,
                tableId: 8,
                field: 'productName',
                label: 'Desc. do Produto',
                description: 'Descrição do Produto',
                type: FieldType.STRING,
                lenght: 15,
                decimal: 0
            },
            {
                id: 21,
                tableId: 8,
                field: 'value',
                label: 'Vlr. Unitário',
                description: 'Valor Unitário do item',
                type: FieldType.NUMBER,
                lenght: 14,
                decimal: 2
            },
            {
                id: 22,
                tableId: 8,
                field: 'quantity',
                label: 'Quantidade',
                description: 'Quantidade do item',
                type: FieldType.NUMBER,
                lenght: 6,
                decimal: 0
            },
            {
                id: 23,
                tableId: 8,
                field: 'amount',
                label: 'Vlr. Total',
                description: 'Valor total do item',
                type: FieldType.NUMBER,
                lenght: 14,
                decimal: 2
            }
        ];

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
            paymentMethod,
            paymentConditions,
            priceList,
            productBalance,
            products,
            sales,
            salesItems,
            sellers,
            tables
        };

        return of(db).pipe(delay(1300));
    }

    getDateRandom(
        isNewDate = true,
        day = 1,
        month = 1,
        year = new Date().getFullYear()
    ): Date {
        const dateIni = new Date(`${year}-${month}-${day}`);
        const dateEnd = new Date();

        if (dateIni > dateEnd) {
            dateIni.setFullYear(year - 1);
        }
        const diff = dateEnd.getTime() - dateIni.getTime();
        if (isNewDate) {
            return new Date(dateIni.getTime() + diff * Math.random());
        } else {
            return dateIni;
        }
    }
}
