import { CurrencyPipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SalesItems } from './../../../../shared/interfaces/sales-items';

const DEBOUNCE_TIME = 300;

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})
export class MoreInformationComponent implements OnInit, OnChanges {
  @Input() formCard!: UntypedFormGroup;
  @Input() salesItems: SalesItems = {
    productId: '',
    productName: '',
    quantity: 0,
    id: 0,
    salesId: 0,
    itemId: 0,
    value: 0,
    amount: 0
  };
  amount: string = '';
  value: string = '';
  discountedValue: string = '';
  formItem!: UntypedFormGroup;

  constructor(
    private currencyPipe: CurrencyPipe,
    private fb: UntypedFormBuilder,
    private poNotification: PoNotificationService
  ) {
    this.poNotification.setDefaultDuration(5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onInitPage();
  }

  ngOnInit(): void {
    this.onInitForm();
    this.onChangeDiscount();
  }

  onInitPage(): void {
    this.amount =
      this.currencyPipe.transform(this.salesItems.amount, 'BRL') + '';
    this.value = this.currencyPipe.transform(this.salesItems.value, 'BRL') + '';
    this.discountedValue =
      this.currencyPipe.transform(this.salesItems.value, 'BRL') + '';
  }

  onInitForm(): void {
    this.formItem = this.fb.group({
      discount: [this.salesItems.discount, [Validators.min(0), Validators.max(99.99)]],
      discountamount: [0, Validators.min(0)]
    });
  }

  onChange(): void {
    this.onInitPage();
    if (this.canApplyDiscount()) {
      this.formItem
        .get('discount')
        ?.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), distinctUntilChanged())
        .subscribe(percentage => {
          if (this.isAValidDiscountPercentage(percentage)) {
            this.calculateDiscountAmount(percentage);
          } else {
            this.poNotification.error('Percentual de Desconto invalido');
          }
        });

      this.formItem
        .get('discountamount')
        ?.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), distinctUntilChanged())
        .subscribe(value => {
          this.calculateDiscountPercentage(value);
        });
    } else {
      this.poNotification.error('Preencher Quantidade do Produto');
      this.cleanDiscounts();
    }
  }

  onChangeDiscount(): void {
    this.formItem
    .get('discount')
    ?.valueChanges.pipe(debounceTime(DEBOUNCE_TIME), distinctUntilChanged())
    .subscribe(percentage => {
      if (this.isAValidDiscountPercentage(percentage)) {
        this.calculateDiscountAmount(percentage);
      } else {
        this.poNotification.error('Percentual de Desconto invalido');
      }
    });
  }

  cleanDiscounts(): void {
    this.formItem.get('discount')?.setValue(0, { emitEvent: false });
    this.formItem.get('discountamount')?.setValue(0, { emitEvent: false });
    this.setItemDiscount(0, 0);
  }

  calculateDiscountAmount(percentage: number): void {
    let discountValue = 0;
    if (percentage > 0) {
      discountValue =
        ((percentage * this.salesItems.value) / 100) * this.salesItems.quantity;
      this.formItem
        .get('discountamount')
        ?.setValue(discountValue, { emitEvent: false });
      this.setItemDiscount(discountValue, percentage);
    } else {
      this.cleanDiscounts();
    }
  }

  calculateDiscountPercentage(value: number): void {
    let percentage = 0;
    if (value > 0) {
      percentage =
        ((value * 100) / this.salesItems.value) * this.salesItems.quantity;
      if (this.isAValidDiscountPercentage(percentage)) {
        this.formItem
          .get('discount')
          ?.setValue(percentage, { emitEvent: false });
        this.setItemDiscount(value, percentage);
      } else {
        this.poNotification.error('Percentual de Desconto invalido');
      }
    } else {
      this.cleanDiscounts();
    }
  }

  canApplyDiscount(): boolean {
    return this.salesItems.quantity > 0 && this.salesItems.amount > 0;
  }

  isAValidDiscountPercentage(percentage: number): boolean {
    return percentage >= 0 && percentage < 100;
  }

  setItemDiscount(discount: number, percentage: number): void {
    const price = this.salesItems.value - discount / this.salesItems.quantity;
    const amount = price * this.salesItems.quantity;

    if (this.salesItems.quantity > 0) {
      this.discountedValue = this.currencyPipe.transform(price.toFixed(2), 'BRL') + '';
      this.salesItems.discount = percentage;
      this.formCard.get('discount')?.setValue(percentage, { emitEvent: false });
      this.formCard.get('price')?.setValue(price.toFixed(2), { emitEvent: false });
      this.formCard.get('amount')?.setValue(amount.toFixed(2), { emitEvent: false });
    }
  }
}
