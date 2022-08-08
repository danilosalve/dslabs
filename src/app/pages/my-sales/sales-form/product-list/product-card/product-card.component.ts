import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SalesItems } from '@app/pages/my-sales/shared/interfaces/sales-items';
import { TypeDevice } from '@app/shared/interfaces/type-device.enum';
import { DeviceService } from '@app/shared/services/device.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
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
        customerOrderId: ''

    };
    formItem!: UntypedFormGroup;
    isEnableButton = false;
    sizeSlide = 'auto';

    constructor(
        protected fb: UntypedFormBuilder,
        protected poNotification: PoNotificationService,
        protected deviceService: DeviceService
    ) {}

    ngOnInit(): void {
        this.onInitForm();
        this.setSizeSlide();
    }

    onInitForm(): void {
        this.formItem = this.fb.group({
            price: [
                this.salesItem.value,
                [Validators.required, Validators.min(0.01)]
            ],
            quantity: [
                this.salesItem.quantity,
                [Validators.required, Validators.min(1)]
            ],
            amount: [
                this.salesItem.amount,
                [Validators.required, Validators.min(0.01)]
            ],
            discount: [0, [Validators.min(0), Validators.max(99.99)]],
            customerOrderId: ['', [Validators.maxLength(9)]]
        });
    }

    addProduct(product: SalesItems): void {
        if (this.formItem.valid) {
            this.changeItems.emit({ ...product });
            this.resetForm();
        } else {
            this.poNotification.warning(
                'Um ou mais campo obrigatorio não foram preenchidos'
            );
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
        this.formItem.get('amount')?.setValue(amount.toFixed(2));
        this.salesItem.quantity = quantity;
        this.salesItem.amount = amount;
    }

    @HostListener('window:resize')
    setSizeSlide(): void {
        const device = this.deviceService.getDevice();
        switch (device.type) {
            case TypeDevice.SMARTPHONE:
                this.sizeSlide = 'auto';
                break;
            case TypeDevice.TABLET:
                this.sizeSlide = 'lg';
                break;
            case TypeDevice.MONITORSMALL:
                this.sizeSlide = 'lg';
                break;
            default:
                this.sizeSlide = 'md';
        }
    }
}
