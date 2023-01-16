import { Component, Injector } from '@angular/core';
import { BaseResourceDetail } from '@app/shared/components/base/base-resource-detail.component';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Contact } from '../shared/interfaces/contact';
import { ContactModel } from './../shared/model/contact-model';

@Component({
    selector: 'app-contact-detail',
    templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent extends BaseResourceDetail {
    contact: Contact = new ContactModel();
    constructor(protected override injector: Injector) {
        super(injector, 'contacts/');
    }
    getBreadCrumb(): PoBreadcrumb {
        return {
            items: [
                { label: 'Meus Contatos', link: '/contacts' },
                { label: this.titlePage }
            ]
        };
    }

    onInitResources(): void {
      this.contact = this.activatedroute.snapshot.data['contact'];
    }
}
