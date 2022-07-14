import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Sales } from '../shared/interfaces/sales';
import { SalesModel } from '../shared/model/sales-model';
import { SalesItemsService } from '../shared/services/sales-items.service';
import { SalesService } from '../shared/services/sales.service';
import { SalesItems } from './../shared/interfaces/sales-items';
@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html'
})
export class SalesFormComponent implements OnInit {
  sales: Sales = new SalesModel();
  isDisableSubmit = true;
  dynamicForm: NgForm | undefined;
  salesItems: SalesItems[] = [];
  itemId = 0;

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Meus Pedidos', action: this.cancel.bind(this) },
      { label: 'Novo Pedido' }
    ]
  };

  constructor(
    protected router: Router,
    protected poNotification: PoNotificationService,
    protected salesService: SalesService,
    protected salesItemService: SalesItemsService,
    protected titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('DSLabs | Novo Pedido');
  }

  cancel(): void {
    this.router.navigate(['sales']);
  }

  onSubmit(): void {
    if (this.canSaveSalesOrder()) {
      this.salesService
      .create(this.sales)
      .pipe(
        tap(res => this.updateSalesIdOnItems(res.id)),
        switchMap(sales => {
          this.salesItems.forEach(item =>
            this.salesItemService.create(item).subscribe({
              error: () => this.handleErrorSubmit()
            })
          );
          return of(sales);
        })
      )
      .subscribe({
        next: sale => {
          this.poNotification.success(`Pedido de Venda ${sale.id} incluído com sucesso!!!`);
          this.router.navigate(['sales']);
        },
        error: () => this.handleErrorSubmit()
      });
    } else {
      if (this.salesItems.length === 0) {
        this.poNotification.error('Adicione ao menos um produto no carrinho para Salvar o Pedido');
      } else {
        this.poNotification.error('Um ou mais campos obrigatorios não foram preenchidos');
      }
    }
  }

  handleErrorSubmit(): void {
    this.poNotification.error('Falha ao incluir Pedido');
  }

  addSalesItem(salesItem: any): void {
    this.salesItems = this.salesItems.concat(salesItem);
    this.isDisableSubmit = !this.canSaveSalesOrder();
  }

  updateSalesIdOnItems(id: number): void {
    this.salesItems.map(items => items.salesId = id);
  }

  canSaveSalesOrder(): boolean {
    return this.dynamicForm?.valid! && this.salesItems.length > 0;
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
    this.dynamicForm.valueChanges?.subscribe(() => {
      this.isDisableSubmit = !this.canSaveSalesOrder();
    })
  }
}
