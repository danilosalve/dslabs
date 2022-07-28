import { TableStatus } from '../interfaces/table-status.enum';

export class TableModel {
    id: number;
    table: string;
    description: string;
    status: TableStatus;
    canEdit: boolean;
    filter: string;

    constructor(
        id?: number,
        table?: string,
        description?: string,
        status?: TableStatus,
        canEdit?: boolean,
        filter?: string
    ) {
        this.id = id || 0;
        this.table = table || 'XXX';
        this.description = description || 'INVALIDO';
        this.status = status || TableStatus.DISABLED;
        this.canEdit = canEdit || false;
        this.filter = filter || '';
    }
}
