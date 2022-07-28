import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { take } from 'rxjs/operators';
import { SellerService } from './../../shared/services/seller.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
    profile: PoToolbarProfile = {
        title: ''
    };
    profileActions: Array<PoToolbarAction> = [
      { icon: 'po-icon-settings', label: 'Configurações', action: () => this.navigateToSettings() },
      { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true }
    ];

    actions: Array<PoToolbarAction> = [
      { label: 'Novo Pedido', action: () => this.navigateToNewSale() }
    ];

    notificationActions: Array<PoToolbarAction> = [
      {
        icon: 'po-icon-news',
        label: 'Pedido incluido com sucesso 123456',
        type: 'danger'
      },
      { icon: 'po-icon-message', label: 'Pedido incluido com sucesso 000123' },
      { icon: 'po-icon-message', label: 'Pedido incluido com sucesso 000001' }
    ];

    constructor(
        private sellerService: SellerService,
        private poNotification: PoNotificationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.onInitResources();
    }

    onInitResources(): void {
        this.setProfile();
    }

    setProfile(): void {
        this.sellerService
            .getById(1)
            .pipe(take(1))
            .subscribe({
                next: seller => {
                    this.profile.subtitle = seller.email;
                    this.profile.title = seller.name;
                },
                error: () =>
                    this.poNotification.error('Falha ao obter Vendedor')
            });
    }

    navigateToSettings(): void {
      this.router.navigate(['settings'])
    }

    navigateToNewSale(): void {
      this.router.navigate(['sales/new'])
    }
}
