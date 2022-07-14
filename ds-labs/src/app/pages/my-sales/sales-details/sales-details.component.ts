import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Sales } from '../shared/interfaces/sales';
import { SalesItems } from '../shared/interfaces/sales-items';
import { SalesModel } from '../shared/model/sales-model';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html'
})
export class SalesDetailsComponent implements OnInit {
  header: Sales = new SalesModel();
  items: SalesItems[] = [];
  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Meus Pedidos', link: '/sales' }, { label: 'Detalhes do Pedido de Venda' }]
  };

  constructor(
    protected activatedroute: ActivatedRoute,
    protected router: Router,
    protected titleService: Title
  ) {}

  ngOnInit(): void {
    this.onInitPage();
    this.onInitResources();
  }

  onInitPage(): void {
    this.titleService.setTitle('DSLABs | Detalhes do Pedido');
  }

  onInitResources(): void {
    this.getSalesHeaderByRoute();
    this.getSalesItemsByRoute();
  }

  handleBack(): void {
    this.router.navigate(['sales/']);
  }

  getSalesHeaderByRoute(): void {
    this.header = this.activatedroute.snapshot.data['header'];
  }

  getSalesItemsByRoute(): void {
    this.items = this.activatedroute.snapshot.data['items'];
  }
}
