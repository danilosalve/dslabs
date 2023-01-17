import { Component, Input } from '@angular/core';
import { PoChartSerie, PoChartType } from '@po-ui/ng-components';
import { Customer } from './../../shared/interface/customer';

@Component({
  selector: 'app-financial-data',
  templateUrl: './financial-data.component.html'
})
export class FinancialDataComponent {
  @Input() customer!: Customer;
  typeChart: PoChartType = PoChartType.Donut;
  credit: number = this.generateNumberBetween(1, 99);
  series: Array<PoChartSerie> = [
    { label: 'Crédito utilizado', data: this.credit, tooltip: 'Crédito utilizado' },
    { label: 'Crédito não utilizado', data: 100 - this.credit, tooltip: 'Crédito não utilizado' }
  ];
  constructor() { }

  generateNumberBetween(min: number, max: number): number {
    if (min > max) {
      [max, min] = [min, max];
    }
    const factor = max - min + 1;
    const random = (Math.random() * factor) + min
    return Number.parseInt(random.toString());
  }

}
