import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from '@app/shared/interfaces/seller';
import { DocumentPipe } from '@app/shared/pipe/document.pipe';
import {
  PoModalComponent,
  PoNotificationService,
  PoToolbarAction,
  PoToolbarProfile
} from '@po-ui/ng-components';
import { BdcWalkService } from 'bdc-walkthrough';
import { take } from 'rxjs/operators';
import { SellerModel } from './../../shared/model/seller.model';
import { PhonePipe } from './../../shared/pipe/phone.pipe';
import { ZipcodePipe } from './../../shared/pipe/zipcode.pipe';
import { SellerService } from './../../shared/services/seller.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
    seller: Seller = new SellerModel();
    profile: PoToolbarProfile = {
        title: '',
        avatar: 'https://pbs.twimg.com/profile_images/378800000499478314/f17d80e194e858db99bb1d5a7ebfd1f9_400x400.jpeg'
    };
    profileActions: Array<PoToolbarAction> = [
        {
            icon: 'po-icon-user',
            label: 'Meu Perfil',
            action: () => this.handleProfileSeller()
        },
        {
            icon: 'po-icon-settings',
            label: 'Configurações',
            action: () => this.navigateToSettings()
        },
        {
            icon: 'po-icon-help',
            label: 'Reiniciar Tutorial',
            action: () => this.clearBdcWalk()
        },
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
        {
            icon: 'po-icon-message',
            label: 'Pedido incluido com sucesso 000123'
        },
        { icon: 'po-icon-message', label: 'Pedido incluido com sucesso 000001' }
    ];
    @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

    constructor(
        private sellerService: SellerService,
        private poNotification: PoNotificationService,
        private router: Router,
        private documentPipe: DocumentPipe,
        private phonePipe: PhonePipe,
        private zipcodePipe: ZipcodePipe,
        private bdcWalkService: BdcWalkService
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
                    this.seller = seller;
                    this.profile.subtitle = seller.email;
                    this.profile.title = seller.name;
                },
                error: () =>
                    this.poNotification.error('Falha ao obter Vendedor')
            });
    }

    navigateToSettings(): void {
        this.router.navigate(['settings']);
    }

    navigateToNewSale(): void {
        this.router.navigate(['sales/new']);
    }

    handleProfileSeller(): void {
        this.poModal.open();
    }

    transformDocumentSeller(document: string): string {
        return this.documentPipe.transform(document);
    }

    transformBirthDaySeller(birthday: Date): string {
        const date =
            typeof birthday.toLocaleDateString === 'function'
                ? birthday
                : new Date(birthday);
        return date ? date.toLocaleDateString() : '';
    }

    transformPhoneSeller(phone: number): string {
      return this.phonePipe.transform(phone);
    }

    transformZipCodeSeller(zipCode: string): string {
      return this.zipcodePipe.transform(zipCode);
    }

    clearBdcWalk(): void {
      this.bdcWalkService.reset();
    }
}
