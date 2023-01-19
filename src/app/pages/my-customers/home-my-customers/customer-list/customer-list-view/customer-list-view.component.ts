import { Component, ViewChild } from '@angular/core';
import { ContactRelationship } from '@app/pages/my-contacts/shared/interfaces/contact-relationship';
import { ContactRelationshipService } from '@app/pages/my-contacts/shared/services/contact-relationship.service';
import { CustomerType } from '@app/pages/my-customers/shared/enum/customer-type.enum';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { BaseResourceListView } from '@app/shared/components/base/base-resource-list-view.component';
import { UtilsService } from '@app/shared/services/utils.service';
import { PoListViewAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';

@Component({
    selector: 'app-customer-list-view',
    templateUrl: './customer-list-view.component.html'
})
export class CustomerListViewComponent extends BaseResourceListView<Customer> {
  @ViewChild(PoModalComponent, { static: true })
  poModalAddContact!: PoModalComponent;
  customer!: Customer;
  isFormInvalid = true;
  contactForm = { contactId: 0};
  contactRelationshipId = 0;
  type = {}
    constructor(
        protected customerService: CustomerService,
        protected utilsService: UtilsService,
        protected contactRelationshipService: ContactRelationshipService,
    protected poNotificationService: PoNotificationService
    ) {
        super();
    }

    transformType(type: string): string {
      switch (type) {
        case CustomerType.FINAL_COSTUMER:
          return 'Consumidor Final';
        case CustomerType.DEALER:
          return 'Revendedor';
        case CustomerType.RURAL_PRODUCER:
          return 'Produtor Rural';
        case CustomerType.EXPORT:
          return 'Exportação';
        default:
          return 'Não informado'
      }
    }

    getActions(): PoListViewAction[] {
      return [
        {
          label: 'Adicionar contato',
          icon: 'po-icon-plus',
          action: this.addContact.bind(this)
        }
      ];
    }

    addContact(customer: Customer): void {
      this.customer = customer;
      this.contactForm = { contactId: 0};
      this.poModalAddContact.open();
    }

    handleSaveContact($event: { form: any; invalidForm: boolean }): void {
      this.contactForm = $event.form;
      this.isFormInvalid = $event.invalidForm;

      if (!this.isFormInvalid) {
        this.fetchNextCode();
      }
    }

    submitContactForm(): void {
      if (!this.isFormInvalid) {
        const contactRelationship: ContactRelationship = {
          id: this.contactRelationshipId,
          contactId: this.contactForm.contactId,
          customerId: this.customer.id
        }

        this.contactRelationshipService.create(contactRelationship).subscribe({
          next: () => {
            this.poNotificationService.success('Contato adicionado com sucesso');
            this.poModalAddContact.close();
          },
          error: () => this.poNotificationService.error('Falha ao adicionar contato')
        })
      } else {
        this.poNotificationService.warning('Selecione um contato valido')
      }
    }

    fetchNextCode(): void {
      this.contactRelationshipService.getAll().subscribe({
        next: res => res.forEach(c => this.contactRelationshipId = ++c.id),
        error: () =>  this.poNotificationService.error('Não foi possivel o Código do Contato')
      })
    }
}
