import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PoMenuComponent, PoMenuItem } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy, AfterViewInit {
  menus: Array<PoMenuItem> = [];
  private _routerSubscription$!: Subscription;
  @ViewChild('poMenu') poMenu!: PoMenuComponent;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this._routerSubscription$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.poMenu.collapse();
      }
    });
  }
  ngOnDestroy(): void {
    this._routerSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems(): void {
    this.menus = this.getMenuItems();
  }

  getMenuItems(): PoMenuItem[] {
    return [
      {
        label: 'Pagina Inicial',
        icon: 'po-icon-home',
        shortLabel: 'Home',
        action: () => {
          this.router.navigate(['']);
        }
      },
      {
        label: 'Minhas Contas',
        icon: 'po-icon-users',
        shortLabel: 'Contas',
        subItems: [
          {
            label: 'Meus Clientes',
            icon: 'po-icon-users',
            action: () => {
              this.router.navigate(['customers']);
            }
          },
          {
            label: 'Meus Prospects',
            shortLabel: 'Prospects',
            action: () => {
              this.router.navigate(['prospects']);
            }
          },
          {
            label: 'Meus Contatos',
            shortLabel: 'Contatos',
            action: () => {
              this.router.navigate(['contacts']);
            }
          }
        ]
      },
      {
        label: 'Meus Produtos',
        icon: 'po-icon-pushcart',
        shortLabel: 'Produtos',
        action: () => {
          this.router.navigate(['products']);
        }
      },
      {
        label: 'Meus Pedidos',
        shortLabel: 'Vendas',
        icon: 'po-icon-cart',
        action: () => {
          this.router.navigate(['sales']);
        }
      },
      {
        label: 'Meus Faturamentos',
        shortLabel: 'Faturamento',
        icon: 'po-icon-sale',
        action: () => {
          this.router.navigate(['invoices']);
        }
      }
    ]
  }
}
