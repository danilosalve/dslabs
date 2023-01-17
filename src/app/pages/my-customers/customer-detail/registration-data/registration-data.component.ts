import { Component, Input } from '@angular/core';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import { PhonePipe } from '@app/shared/pipe/phone.pipe';
import { UtilsService } from '@app/shared/services/utils.service';
import { CustomerType } from '../../shared/enum/customer-type.enum';
import { Customer } from '../../shared/interface/customer';
import { TypeOfPerson } from './../../../../shared/enum/type-of-person.enum';

@Component({
    selector: 'app-registration-data',
    templateUrl: './registration-data.component.html'
})
export class RegistrationDataComponent {
    @Input() customer!: Customer;
    constructor(
        protected utilsService: UtilsService,
        protected documentPipe: DocumentPipe,
        protected phonePipe: PhonePipe
    ) {}

    get nameLabel(): string {
        return this.isLegalPerson() ? 'Razão social' : 'Nome';
    }

    get customerCode(): string {
        return `${this.customer.id}/${this.customer.store}`;
    }

    isLegalPerson(): boolean {
        return this.customer.typePerson === TypeOfPerson.LEGAL;
    }

    get dateRegisterLabel(): string {
        return this.isLegalPerson() ? 'Data de Registro' : 'Data de Nascimento';
    }

    get customerType(): string {
        switch (this.customer.customerType) {
            case CustomerType.FINAL_COSTUMER:
                return 'Consumidor Final';
            case CustomerType.DEALER:
                return 'Revendedor';
            case CustomerType.EXPORT:
                return 'Exportação';
            case CustomerType.RURAL_PRODUCER:
                return 'Produtor Rural';
            default:
                return 'Não especificado';
        }
    }

}
