import { Injectable, Injector } from '@angular/core';
import { BaseResourceServiceFull } from '@app/shared/services/base-resource-full.service';
import { PoTableColumn } from '@po-ui/ng-components';
import { Product } from '../interface/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseResourceServiceFull<Product> {
    constructor(protected override injector: Injector) {
        super('api/products/', injector);
    }

    getColumns(): PoTableColumn[] {
        return [
            {
                property: 'id',
                label: 'Código',
                type: 'string',
                width: '8%',
                visible: true
            },
            {
                property: 'description',
                label: 'Descrição',
                type: 'string',
                width: '35%',
                visible: true
            },
            {
                property: 'unitOfMeasurement',
                label: 'Unid. Medida',
                type: 'string',
                width: '10%',
                visible: true
            },
            {
                property: 'price',
                label: 'Preço',
                type: 'currency',
                width: '15%',
                visible: true
            },
            {
                property: 'stockBalance',
                label: 'Sld. Estoque',
                type: 'number',
                width: '15%',
                visible: true
            },
            {
                property: 'group',
                label: 'Grupo',
                type: 'label',
                width: '10%',
                labels: [
                    {
                        value: 'Frutas',
                        color: 'color-08',
                        label: 'Frutas'
                    },
                    {
                        value: 'Legumes',
                        color: 'color-07',
                        label: 'Legumes'
                    },
                    {
                        value: 'Verduras',
                        color: 'color-09',
                        label: 'Verduras'
                    }
                ]
            }
        ];
    }
    getHeadersForExcel(): string[] {
        return [
            'Código',
            'Descrição',
            'Preço',
            'Unid. Medida',
            'Foto',
            'Grupo'
        ];
    }
}
