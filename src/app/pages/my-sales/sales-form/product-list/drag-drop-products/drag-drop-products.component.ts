import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '@app/pages/my-products/shared/services/product.service';
import { DeviceService } from '@app/shared/services/device.service';
import { PoNotificationService, PoProgressStatus } from '@po-ui/ng-components';
export class CsvData {
    productId: string;
    value: number;
    quantity: number;
    amount: number;
    discount: number;
    customerOrderId: string;

    constructor() {
        this.productId = '';
        this.value = 0;
        this.quantity = 0;
        this.amount = 0;
        this.discount = 0;
        this.customerOrderId = '';
    }
}

@Component({
    selector: 'app-drag-drop-products',
    templateUrl: './drag-drop-products.component.html',
    styleUrls: ['./drag-drop-products.component.scss']
})
export class DragDropProductsComponent {
    @Output() product = new EventEmitter();
    currentLine = 0;
    fileName = '';
    isLoadingFile: boolean;
    progressIcon = 'po-icon-upload-cloud';
    progressInfo = '0/0';
    progressStatus = PoProgressStatus.Default;
    progressValue = 0;
    totalLine = 0;

    constructor(
        protected poNotificationService: PoNotificationService,
        protected productService: ProductService,
        protected deviceService: DeviceService
    ) {
        this.isLoadingFile = false;
    }

    uploadListener($event: any): void {
        this.isLoadingFile = true;
        this.progressValue = 0;
        this.currentLine = 0;
        this.totalLine = 0;
        this.progressStatus = PoProgressStatus.Default;
        this.fileName = '';
        let files = $event.srcElement.files;
        this.calculeteProgress();

        if (files.length) {
            if (this.isValidCSVFile(files[0])) {
                this.fileName = files[0].name;
                let input = $event.target;
                let reader = new FileReader();
                reader.readAsText(input.files[0]);

                reader.onload = () => {
                    let csvData = reader.result;
                    let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
                    this.totalLine = csvRecordsArray.length;

                    let headersRow = this.getHeaderArray(csvRecordsArray);
                    const records = this.getDataRecordsArrayFromCSVFile(
                        csvRecordsArray,
                        headersRow
                    );
                    this.onProductEmitter(records);
                };

                reader.onerror = () => {
                    this.progressStatus = PoProgressStatus.Error;
                    this.progressIcon = 'po-icon-warning';
                    this.fileName = '';
                    this.poNotificationService.error(
                        'Ocorreu um erro ao tentar ler o arquivo!'
                    );
                };
            } else {
                this.poNotificationService.warning(
                    'Importe um arquivo .csv válido.'
                );
            }
        } else {
            this.isLoadingFile = false;
        }
    }

    hasPropertyOnFile(property: string, headersRow: string[]): boolean {
        return headersRow.includes(property);
    }

    getPositionPropertyOnFile(property: string, headersRow: string[]): number {
        return headersRow.findIndex(h => h === property);
    }

    getValueFromFile(
        property: string,
        headersRow: string[],
        currentyRow: any,
        type: string
    ): any {
        if (this.hasPropertyOnFile(property, headersRow)) {
            const index = this.getPositionPropertyOnFile(property, headersRow);

            if (type === 'number') {
                return Number.parseFloat(currentyRow[index]);
            } else {
                return currentyRow[index];
            }
        }

        return undefined;
    }

    getDataRecordsArrayFromCSVFile(
        csvRecordsArray: any,
        headersRow: string[]
    ): any[] {
        let csvArr = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
            let currentyRecord = csvRecordsArray[i].split(';');
            if (currentyRecord.length > 0) {
                let csvRecord: CsvData = new CsvData();
                csvRecord.productId =
                    this.getValueFromFile(
                        'code',
                        headersRow,
                        currentyRecord,
                        'string'
                    ) || '';
                csvRecord.value =
                    this.getValueFromFile(
                        'unitPrice',
                        headersRow,
                        currentyRecord,
                        'number'
                    ) || 0;
                csvRecord.quantity =
                    this.getValueFromFile(
                        'quantity',
                        headersRow,
                        currentyRecord,
                        'number'
                    ) || 0;
                csvRecord.amount =
                    this.getValueFromFile(
                        'amountPrice',
                        headersRow,
                        currentyRecord,
                        'number'
                    ) || 0;
                csvRecord.discount =
                    this.getValueFromFile(
                        'discount',
                        headersRow,
                        currentyRecord,
                        'number'
                    ) || 0;
                csvRecord.customerOrderId =
                    this.getValueFromFile(
                        'customerOrderId',
                        headersRow,
                        currentyRecord,
                        'string'
                    ) || '';
                csvArr.push(csvRecord);
            }
            this.currentLine++;
            this.calculeteProgress();
        }
        return csvArr;
    }

    isValidCSVFile(file: File): boolean {
        return file.name.endsWith('.csv');
    }

    getHeaderArray(csvRecordsArr: any): any[] {
        let headers = csvRecordsArr[0].split(';');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        this.currentLine++;
        this.calculeteProgress();
        return headerArray;
    }

    calculeteProgress(): void {
        this.progressValue = (this.currentLine / this.totalLine) * 100;
        this.progressInfo = `${this.currentLine}/${this.totalLine}`;
        if (this.progressValue < 100) {
            this.progressStatus = PoProgressStatus.Success;
            this.progressIcon = 'po-icon-ok';
        }
    }

    onProductEmitter(products: any): void {
        this.product.emit(products);
    }

    get isSmartphone(): boolean {
      return this.deviceService.isSmartphone();
    }
}
