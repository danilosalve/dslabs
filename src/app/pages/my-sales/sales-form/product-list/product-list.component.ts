import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductService } from './../../../../shared/services/product.service';
import { SalesItems } from './../../shared/interfaces/sales-items';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy {
    @Output() changeItems = new EventEmitter();
    @Input() isMobile = false;
    items: SalesItems[] = [];
    selectedItem: SalesItems[] = [];
    product$ = new Subscription();
    isProductNotFound = false;
    itemId = 0;

    constructor(
        protected poDialog: PoDialogService,
        protected productService: ProductService,
        protected poNotification: PoNotificationService
    ) {}

    ngOnDestroy(): void {
        this.product$.unsubscribe();
    }

    onSearchProducts(search: string): void {
        this.product$ = this.productService
            .getAll()
            .pipe(
                tap(() => {
                    this.items = [];
                    this.isProductNotFound = false;
                }),
                map(products =>
                    products.map(product => ({
                        salesId: 0,
                        itemId: 0,
                        productId: product.id,
                        productName: product.description,
                        value: product.price,
                        quantity: 0,
                        amount: 0,
                        discount: 0,
                        isSelected: false,
                        customerOrderId: '',
                        photo: `assets/img/products/${product.photo}`
                    }))
                )
            )
            .subscribe({
                next: products => {
                    if (search) {
                        const items = products.filter(
                            p =>
                                p.productId.includes(search) ||
                                p.productName
                                    .toLowerCase()
                                    .includes(search.toLocaleLowerCase())
                        );
                        if (items.length > 0) {
                            this.items = items as SalesItems[];
                        } else {
                            this.isProductNotFound = true;
                        }

                        this.items.map(item => {
                            item.isSelected = this.isProductSelected(item);
                        });
                    }
                },
                error: () =>
                    this.poNotification.error('Falha ao localizar produto')
            });
    }

    isEmpty(obj: any): boolean {
        if (Object.entries(obj).length === 0) {
            return true;
        }
        return false;
    }

    addItem(item: SalesItems, isUpload = false): void {
        if (this.canAddTheItem(item, isUpload)) {
            this.handleAddItem(item);
        } else {
            if (isUpload) {
                this.handleErrorAddItem(item);
            }
        }
    }

    handleAddItem(item: SalesItems): void {
        this.handleItemTag(item);
        this.itemId++;
        item.itemId = this.itemId;
        this.selectedItem.push(item);
        this.changeItems.emit(item);
    }

    canAddTheItem(item: SalesItems, isUpload: boolean): boolean {
        if (this.canAddProduct(item.productId)) {
            return true;
        } else {
            if (!isUpload) {
                this.poDialog.confirm({
                    title: 'Produto Selecionado',
                    message: `Deseja alterar o produto ${item.productName}?`,
                    confirm: () => this.handleAddItem(item)
                });
            }
            return false;
        }
    }

    handleErrorAddItem(item: SalesItems): void {
        this.poNotification.error(
            `O produto ${
                item.productName ? item.productName : item.productId
            } já foi adicionado ao Carrinho de compras`
        );
    }

    isProductSelected(item: SalesItems): boolean {
        const saleItem = this.selectedItem.find(
            i => i.productId === item.productId
        );
        if (this.selectedItem.length === 0) {
            return false;
        } else {
            return (saleItem || { productId: '' }).productId.length > 0;
        }
    }

    handleItemTag(item: SalesItems): void {
        const index = this.items.findIndex(i => i.productId === item.productId);
        if (index >= 0) {
            this.items[index].isSelected = true;
        }
    }

    onUploadProducts(products: any[]): void {
        products.forEach(p => {
            p.isSelected = !this.canAddProduct(p.productId);
            this.addItem(p, true);
        });
    }

    canAddProduct(id: string): boolean {
        return !this.selectedItem.some(p => p.productId === id);
    }
}
