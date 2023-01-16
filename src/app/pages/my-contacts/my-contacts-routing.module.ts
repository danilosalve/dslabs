import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './home-my-contacts/contact-list/contact-list.component';
import { ContactGuard } from './shared/guards/contact.guard';

const routes: Routes = [
    {
        path: '',
        component: ContactListComponent,
        data: {
            title: 'Meus Contatos'
        }
    },
    {
        path: 'new',
        component: ContactFormComponent,
        data: {
            title: 'Novo Contato'
        }
    },
    {
        path: 'edit/:id',
        component: ContactFormComponent,
        resolve: {
            contact: ContactGuard
        },
        data: {
            title: 'Editar Contato'
        }
    },
    {
        path: 'view/:id',
        component: ContactDetailComponent,
        resolve: {
            contact: ContactGuard
        },
        data: {
            title: 'Detalhes do Contato'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyContactsRoutingModule {}
