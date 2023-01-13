import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { ProspectStatus } from '@app/pages/my-prospects/shared/enum/prospect-status.enum';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';
import { Prospect } from './../pages/my-prospects/shared/interfaces/prospect';
import { ProspectModel } from './../pages/my-prospects/shared/model/prospect-model';

let id = 0;

export const prospects: Prospect[] = [
    new ProspectModel(
        ++id,
        1,
        'Alícia e Ana Limpeza ME',
        TypeOfPerson.LEGAL,
        '42446153000107',
        CustomerType.FINAL_COSTUMER,
        'SP',
        'Ferraz de Vasconcelos',
        'Avenida Dom Pedro II, 155',
        'Jardim Santiago',
        '08510000',
        '',
        ResourceStatus.active,
        new Date(2018, 6, 18),
        'Alicia',
        'alicia@aliana.com.br',
        1136577948,
        ProspectStatus.QUALIFIED
    ),
    new ProspectModel(
        ++id,
        1,
        'Pousada Recando dos Sonhos LTDA',
        TypeOfPerson.LEGAL,
        '16990907000185',
        CustomerType.FINAL_COSTUMER,
        'SP',
        'São Sebastião',
        'Rua Deu onda, 144',
        'Maresias',
        '01510000',
        '',
        ResourceStatus.active,
        new Date(2022, 1, 31),
        'Javier',
        'contato@teste.com.br',
        1340577198,
        ProspectStatus.QUALIFIED
    ),
    new ProspectModel(
        ++id,
        1,
        'Daiane e Luana Alimentos ME',
        TypeOfPerson.LEGAL,
        '46508293000113',
        CustomerType.DEALER,
        'SP',
        'Araraquara',
        'Via Antônio Machado Sant Anna, 845',
        'Parque das Hortências',
        '14808000',
        '',
        ResourceStatus.active,
        new Date(2014, 7, 21),
        'Alicia',
        'alicia@aliana.com.br',
        1627353108,
        ProspectStatus.QUALIFIED
    ),
    new ProspectModel(
        ++id,
        1,
        'Caroline e Luan Contábil Ltda',
        TypeOfPerson.LEGAL,
        '23064968000187',
        CustomerType.FINAL_COSTUMER,
        'SP',
        'Leme',
        'Rua Irmã Sílvia Raubuch, 264',
        'Barra Funda',
        '08510000',
        '',
        ResourceStatus.active,
        new Date(2005, 2, 7),
        'Carol',
        'leme@teste.com.br',
        19395652,
        ProspectStatus.QUALIFIED
    ),
    new ProspectModel(
        ++id,
        1,
        'Silvana e Nair Eletrônica Ltda',
        TypeOfPerson.LEGAL,
        '92580538000130',
        CustomerType.FINAL_COSTUMER,
        'SP',
        'Sertãozinho',
        'Rua José Lopes Neto, 730',
        'Jardim Santiago',
        '14164167',
        '',
        ResourceStatus.active,
        new Date(2021, 8, 11),
        'Alicia',
        'contabilidade@sneleletrica.com.br',
        1637028481,
        ProspectStatus.QUALIFIED
    )
];
