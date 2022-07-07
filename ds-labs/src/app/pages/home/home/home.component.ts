import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Sales } from '@app/pages/my-sales/shared/interfaces/sales';
import { SalesService } from '@app/pages/my-sales/shared/services/sales.service';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  sales$ = new Subscription();
  isLoading = true;
  sales: Sales[] = [];

  constructor(
    protected salesService: SalesService,
    protected router: Router,
    protected ngZone: NgZone,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.onInitPage();
    this.getSalesOrders();
  }

  ngOnDestroy(): void {
    this.sales$.unsubscribe();
  }

  onInitPage(): void {
    this.setPageTitle('Meus Indicadores');
  }

  setPageTitle(title: string): void {
    this.titleService.setTitle(`DSLABs | ${title}`);
  }

  getSalesOrders(): void {
    this.sales$ = this.salesService
      .getAll()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((sales) => {
        this.sales = sales;
      });
  }
}
