import { Injectable } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { ResourceStatus } from '../enum/resource-status.enum';
import { TypeOfPerson } from '../enum/type-of-person.enum';

interface Document {
  label: string;
  mask: string;
  placeHolder: string;
  min: number;
  max: number;
}
@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    transformStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'Ativo';
            case ResourceStatus.inactive:
                return 'Inativo';
            default:
                return 'Não informado';
        }
    }

    getColorStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'color-11';
            case ResourceStatus.inactive:
                return 'color-07';
            default:
                return 'color-03';
        }
    }

    transformDate(registerDate: Date): string {
        const date =
            typeof registerDate.toLocaleDateString === 'function'
                ? registerDate
                : new Date(registerDate);
        return date ? date.toLocaleDateString() : '';
    }

    getTypePersonOptions(): PoSelectOption[] {
      return [
        {
          label: 'Pessoa Fisica',
          value: TypeOfPerson.NATURAL
        },
        {
          label: 'Pessoa Juridica',
          value: TypeOfPerson.LEGAL
        }
      ]
    }


    handleTypePerson(type: TypeOfPerson): Document {
      let document: Document = {
        label: '',
        mask: '',
        placeHolder: '',
        min: 0,
        max: 0
      };

      if (type === TypeOfPerson.NATURAL) {
        document.label = 'CPF';
        document.mask = '999.999.999-99';
        document.placeHolder = '000.000.000-00';
        document.min = 14;
        document.max = 14;
      } else {
        document.label = 'CNPJ';
        document.mask = '99.999.999/9999-99';
        document.placeHolder = '00.000.000/0000-00';
        document.min = 18;
        document.max = 18;
      }

      return document;
    }
}

