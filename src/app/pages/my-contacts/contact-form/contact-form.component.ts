import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Contact } from '@app/pages/my-contacts/shared/interfaces/contact';
import { BaseResourceForm } from '@app/shared/components/base/base-resource-form.component';
import {
  PoBreadcrumb,
  PoDynamicFormField,
  PoStepperComponent
} from '@po-ui/ng-components';
import { finalize, take } from 'rxjs/operators';
import { ContactModel } from '../shared/model/contact-model';
import { ContactsService } from '../shared/services/contacts.service';
import { ContactFormService } from './shared/contact-form.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent extends BaseResourceForm implements OnInit {
    @ViewChild(PoStepperComponent) poStepperComponent!: PoStepperComponent;
    stepper = 1;
    formContact!: UntypedFormGroup;
    contact: Contact = new ContactModel();
    constructor(
        protected override injector: Injector,
        protected contactFormService: ContactFormService,
        protected contactService: ContactsService
    ) {
        super(injector, 'contacts', false);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.onInitForm();
        this.fetchNextCode();
    }

    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Contatos', action: this.handleBack.bind(this) },
                { label: 'Novo Contato' }
            ]
        };
    }

    onSubmit(): void {
        const contact = this.formContact.getRawValue() as Contact;

        if (this.isEdit()) {
            this.contactService.put(contact, contact.id).subscribe({
                next: () => {
                    this.poNotification.success(
                        'Contato alterado com sucesso!'
                    );
                    this.handleBack();
                },
                error: () =>
                    this.poNotification.error('Falha ao atualizar contato')
            });
        } else {
            this.contactService.create(contact).subscribe({
                next: () => {
                    this.poNotification.success(
                        'Contato cadastrado com sucesso!'
                    );
                    this.handleBack();
                },
                error: () =>
                    this.poNotification.error('Falha ao cadastrar contato')
            });
        }
    }

    getFields(): PoDynamicFormField[] {
        return [];
    }

    nextStep(): void {
        if (this.canMoveToNextPage()) {
            this.poStepperComponent.next();
        }
    }

    previousStep(): void {
        if (this.canMoveToPreviousPage()) {
            this.poStepperComponent.previous();
        }
    }

    canMoveToNextPage(): boolean {
        return this.stepper < this.poStepperComponent.poSteps.length;
    }

    canMoveToPreviousPage(): boolean {
        return this.stepper > 1;
    }

    getStepValue(step: string): number {
        switch (step) {
            case 'Dados Gerais':
                return 1;
            case 'Contato':
                return 2;
            case 'Endereço':
                return 3;
            default:
                return 0;
        }
    }

    handleChangeStep(currentActiveStep: any): void {
        this.stepper = this.getStepValue(currentActiveStep.label);
    }

    onInitForm(): void {
        if (this.isEdit()) {
          this.contact = this.activatedroute.snapshot.data['contact'];
        }
        this.formContact = this.contactFormService.getForm(this.contact);
        // Conversão do campo data para o formato aceito pelo po-ui
        if (this.isEdit() && this.contact.registerDate) {
          this.formContact.get('registerDate')?.setValue(new Date(this.contact.registerDate))
        }
    }

    fetchNextCode(): void {
        if (!this.isEdit()) {
            this.contactService
                .getAll()
                .pipe(
                    take(1),
                    finalize(() =>
                        this.formContact.get('id')?.setValue(this.contact.id)
                    )
                )
                .subscribe({
                    next: contacts =>
                        contacts.forEach(c => {
                            this.contact.id = ++c.id;
                        }),
                    error: () =>
                        this.poNotification.error(
                            'Não foi possivel o Código do Contato'
                        )
                });
        }
    }
}
