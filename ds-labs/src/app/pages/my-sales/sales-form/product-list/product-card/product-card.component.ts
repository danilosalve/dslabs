import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Output() changeItems = new EventEmitter();
  @Input() salesItem: SalesItems = {
    productId: '',
    productName: '',
    quantity: 0,
    id: 0,
    salesId: 0,
    itemId: 0,
    value: 0,
    amount: 0,
  };
  formItem!: FormGroup;
  isEnableButton = false;

  constructor(
    protected fb: FormBuilder,
    protected poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm(): void {
    this.formItem = this.fb.group({
      price: [this.salesItem.value, [Validators.required, Validators.min(0.01)]],
      quantity: [
        this.salesItem.quantity,
        [Validators.required, Validators.min(1)],
      ],
      amount: [this.salesItem.amount, [Validators.required, Validators.min(0.01)]],
      discount: [0, [Validators.min(0), Validators.max(99.99)]],
    });
  }

  addProduct(product: SalesItems): void {
    if (this.formItem.valid) {
      this.changeItems.emit({...product});
      this.resetForm();
    } else {
      console.log(this.formItem);
      this.poNotification.warning('Um ou mais campo obrigatorio não foram preenchidos');
    }
  }

  resetForm(): void {
    this.salesItem.quantity = 0;
    this.salesItem.amount = 0;
    this.formItem.reset();
    this.onInitForm();
  }

  enableButton(): void {
    this.isEnableButton = true;
  }

  onChange(field: string): void {
    const price = this.formItem.get('price')?.value;
    const quantity = this.formItem.get('quantity')?.value;
    const amount = price * quantity;
    this.formItem.get('amount')?.setValue(amount.toPrecision(2));
    this.salesItem.quantity = quantity;
    this.salesItem.amount = amount;
  }
}
