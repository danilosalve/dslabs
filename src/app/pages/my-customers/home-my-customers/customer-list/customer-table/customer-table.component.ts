import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { ContactRelationship } from '@app/pages/my-contacts/shared/interfaces/contact-relationship';
import { Customer } from '@app/pages/my-customers/shared/interface/customer';
import { CustomerService } from '@app/pages/my-customers/shared/services/customer.service';
import { PoModalComponent, PoNotificationService, PoTableAction } from '@po-ui/ng-components';
import { BaseResourceTable } from './../../../../../shared/components/base/base-resource-table.component';
import { ContactRelationshipService } from './../../../../my-contacts/shared/services/contact-relationship.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html'
})
export class CustomerTableComponent extends BaseResourceTable<Customer> {
  @Output() showCustomer = new EventEmitter();
  @ViewChild(PoModalComponent, { static: true })
  poModalAddContact!: PoModalComponent;
  customer!: Customer;
  isFormInvalid = true;
  contactForm = { contactId: 0};
  contactRelationshipId = 0;

  constructor(
    protected customerService: CustomerService,
    protected override injector: Injector,
    protected contactRelationshipService: ContactRelationshipService,
    protected poNotificationService: PoNotificationService
    ) {
      super(injector, customerService);
    }

  getActions(): PoTableAction[] {
    return [
      {
        action: this.handleShowCustomer.bind(this),
        icon: 'po-icon-eye',
        label: 'Visualizar'
      },
      {
        action: this.addContact.bind(this),
        icon: 'po-icon-user',
        label: 'Adicionar Contato'
      }
    ];
  }

  handleShowCustomer($event: Customer): void {
    this.showCustomer.emit($event);
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
