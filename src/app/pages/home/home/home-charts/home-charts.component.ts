import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesStatus } from '@app/pages/my-sales/shared/interfaces/sales-status.enum';
import { PoChartSerie, PoChartType, PoGaugeRanges } from '@po-ui/ng-components';

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html'
})
export class HomeChartsComponent implements OnChanges {
  @Input() sales: Sales[] = [];
  @Input() isLoading = true;
  @Output() showMeSalesEvent = new EventEmitter();
  openSales: Sales[] = [];
  closedSales: Sales[] = [];
  blockedSales: Sales[] = [];
  totalClosedSales = 0;
  typeChart: PoChartType = PoChartType.Donut;
  salesChartSeries: Array<PoChartSerie> = [
    { label: 'Aberto', data: 4, tooltip: 'Pedidos em aberto' },
    { label: 'Bloqueado', data: 3, tooltip: 'Pedidos Bloqueados' },
    { label: 'Encerrado', data: 2, tooltip: 'Pedidos Encerrados' }
  ];
  salesRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 0, label: 'Baixo', color: '#c64840' },
    { from: 0, to: 1, label: 'Médio', color: '#ea9b3e' },
    { from: 0, to: 2, label: 'Alto', color: '#00b28e' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.getClosedSales();
    this.getOpenSales();
    this.getBlockedSales();
    this.setSalesRange();
    this.setSalesSeries();
  }

  getClosedSales(): void {
    this.closedSales = this.sales.filter(s => s.status === SalesStatus.Closed);
    this.totalClosedSales = this.closedSales.length;
  }

  getOpenSales(): void {
    this.openSales = this.sales.filter(s => s.status !== SalesStatus.Open);
  }

  getBlockedSales(): void {
    this.blockedSales = this.sales.filter(s => s.status !== SalesStatus.Blocked);
  }

  setSalesRange(): void {
    const salesMedia = (this.sales.length | 0) / 3;
    this.salesRanges[0].to = salesMedia;
    this.salesRanges[1].from = salesMedia;
    this.salesRanges[1].to = salesMedia * 2;
    this.salesRanges[2].from = salesMedia * 2;
    this.salesRanges[2].to = salesMedia * 3;
  }

  setSalesSeries(): void {
    this.salesChartSeries = [
      { label: 'Aberto', data: this.openSales.length, tooltip: 'Pedidos em aberto' },
      { label: 'Bloqueado', data: this.blockedSales.length, tooltip: 'Pedidos Bloqueados' },
      { label: 'Encerrado', data: this.totalClosedSales, tooltip: 'Pedidos Encerrados' }
    ];
  }

  showMeSales(): void {
    this.showMeSalesEvent.emit();
  }
}
