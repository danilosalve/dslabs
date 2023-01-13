import { Injectable } from '@angular/core';
import { ResourceStatus } from '../enum/resource-status.enum';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() {}

    transformStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'Ativo';
            case ResourceStatus.inactive:
                return 'Inativo';
            default:
                return 'Não informado';
        }
    }

    getColorStatus(status: string): string {
        switch (status) {
            case ResourceStatus.active:
                return 'color-11';
            case ResourceStatus.inactive:
                return 'color-07';
            default:
                return 'color-03';
        }
    }

    transformDate(registerDate: Date): string {
        const date =
            typeof registerDate.toLocaleDateString === 'function'
                ? registerDate
                : new Date(registerDate);
        return date ? date.toLocaleDateString() : '';
    }
}
