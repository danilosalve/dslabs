import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { ContactModel } from '@app/pages/my-contacts/shared/model/contact-model';
import { ResourceStatus } from '@app/shared/enum/resource-status.enum';
import { TypeOfPerson } from '@app/shared/enum/type-of-person.enum';

let id = 0;

export const contacts: Contact[] = [
    new ContactModel(
        ++id,
        'THEODORE EVELYN MOSBY',
        '75260298349',
        new Date(1982, 0, 3),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'PR',
        'Curitiba',
        'Rua Antonio, 563',
        'Tatuquara',
        '81480140',
        '',
        4136464161,
        'ted.mosby@teste.com',
        'Engenharia'
    ),
    new ContactModel(
        ++id,
        'BARNEY STINSON',
        '91856339505',
        new Date(1978, 4, 3),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'MG',
        'Ipatinga',
        'Rua Ervalia, 964',
        'Bela Vista',
        '35160188',
        '',
        3136457194,
        'barney@teste.com',
        'Financeiro'
    ),
    new ContactModel(
        ++id,
        'LILY ALDRIN',
        '',
        new Date(1984, 2, 3),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'SP',
        'São Paulo',
        'Rua Conselheiro Brotero, 769',
        'Tatuquara',
        '01154000',
        '',
        1126180961,
        'lilizinha@teste.com',
        'Educacional'
    ),

    new ContactModel(
        ++id,
        'Andreia',
        '',
        new Date(1994, 8, 7),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'SP',
        'Bragança Paulista',
        'Avenida João Alberto Ahnert, 955',
        'Jardim Águas Claras',
        '12929070',
        '',
        1128302252,
        'andreia@madg.com.br',
        'Marketing'
    ),
    new ContactModel(
        ++id,
        'CRISTIANO',
        '',
        new Date(1992, 10, 27),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'AM',
        'Manaus',
        'Rua Praia Canoa Quebrada, 740',
        'Tarumã',
        '69041360',
        '',
        9226008589,
        'cristiano@padariabreadcrumb.com.br',
        'Comercial'
    ),
    new ContactModel(
        ++id,
        'Leonel',
        '',
        new Date(2006, 11, 3),
        TypeOfPerson.NATURAL,
        ResourceStatus.active,
        'SP',
        'São Paulo',
        'Rua Luiza Campanella Giordano, 799',
        'Pq Paineiras',
        '03694180',
        '',
        4136464161,
        'leo.messi@teste.com',
        'VENDAS'
    )
];
