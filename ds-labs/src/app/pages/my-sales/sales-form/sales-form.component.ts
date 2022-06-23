import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { Sales } from '../shared/interfaces/sales';
import { SalesStatus } from '../shared/interfaces/sales-status.enum';
import { SalesService } from '../shared/services/sales.service';
import { SalesItems } from './../shared/interfaces/sales-items';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html'
})
export class SalesFormComponent implements OnInit {
  sales: Sales = {
    customerId: 0,
    paymentMethodId: 0,
    issueDate: new Date(),
    status: SalesStatus.Open,
    carrierId: 0,
    freight: 0,
    insurance: 0,
    expenses: 0,
    discount: 0
  };
  isDisableSubmit = false;
  dynamicForm: NgForm | undefined;
  salesItems: SalesItems[] = [];
  itemId = 0;

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Meus Pedidos', action: this.cancel.bind(this) },
      { label: 'Novo Pedido' },
    ],
  };

  constructor(
    protected router: Router,
    protected poNotification: PoNotificationService,
    protected salesService: SalesService,
    protected titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('DSLabs | Novo Pedido');
  }

  cancel(): void {
    this.router.navigate(['sales']);
  }

  onSubmit(): void {
    this.salesService
      .create(this.sales)
      /*.pipe(
        tap((res) => this.updateSalesIdOnItems(res.id)),
        switchMap((sales) => {
          this.salesItems.forEach((item) =>
            this.itemService.create(item).subscribe(
              () => this.handleErrorSubmit()
            )
          );
          return of([sales, this.salesItems]);
        })
      )*/
      .subscribe({
        next: (sale) => {
          this.poNotification.success(`Pedido de Venda ${sale.id} incluído com sucesso!!!`);
          this.router.navigate(['sales'])
        },
        error: () => this.handleErrorSubmit()
      });
  }

  handleErrorSubmit(): void {
    this.poNotification.error('Falha ao incluir Pedido');
  }

  canSubmit(): boolean {
    return !this.dynamicForm?.valid
  }

  addSalesItem(salesItem: any): void {
    this.isDisableSubmit = false;
    this.salesItems = this.salesItems.concat(salesItem);
  }
}
