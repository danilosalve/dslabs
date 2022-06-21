import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem> = [];

  constructor(private router: Router) {}

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
        action: () => {
          this.router.navigate(['']);
        },
      },
      {
        label: 'Meus Clientes',
        icon: 'po-icon-handshake',
        action: () => {
          this.router.navigate(['customers']);
        },
      },
      {
        label: 'Meus Pedidos',
        shortLabel: 'Vendas',
        icon: 'po-icon-cart',
        action: () => {
          this.router.navigate(['sales']);
        },
      }
    ]
  }
}
