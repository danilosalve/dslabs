import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SalesStatus } from '@app/pages/my-sales/shared/interfaces/sales-status.enum';
import { PoStepComponent, PoStepperComponent } from '@po-ui/ng-components';
import { Observable, of } from 'rxjs';
import { SalesModel } from './../../../shared/model/sales-model';

@Component({
  selector: 'app-sale-status-details',
  templateUrl: './sale-status-details.component.html'
})
export class SaleStatusDetailsComponent implements AfterViewInit {
  @Input() sale = new SalesModel();
  @ViewChild(PoStepperComponent)
  stepper!: PoStepperComponent;
  canChange = true;
  stepList = [
    {
      label: 'Pedido Aprovado'
    },
    {
      label: 'Bloqueado por regra'
    },
    {
      label: 'Em analise de Crédito'
    },
    {
      label: 'Pedido em Separação'
    },
    {
      label: 'Nota Fiscal expedida'
    },
    {
      label: 'Pedido Encerrado'
    }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setStepperActive(this.getStetByStatus());
    });
  }

  canActiveNextStep(currentActiveStep = <PoStepComponent>{}): Observable<boolean> {
    return of(this.canChange);
  }

  setStepperActive(step: number): void {
    this.stepper!.active(Math.trunc(step));
    this.canChange = false;
  }

  handleRandomStep(): number {
    let step = (Math.random() * 3);
    step = step < 1 ? 1 : step;
    return step > 3 ?  3 : step;
  }

  getStetByStatus(): number {
    switch (this.sale.status) {
      case SalesStatus.Open:
        return 0;
      case SalesStatus.Closed:
        return 5;
      default:
        return this.handleRandomStep()
    }
  }
}
