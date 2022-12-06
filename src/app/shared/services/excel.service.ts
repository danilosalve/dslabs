import { Injectable } from '@angular/core';
import { utils, WorkBook, writeFile } from 'xlsx';
import { BaseResourceServiceFull } from './base-resource-full.service';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {
    onGenerateFile<T>(
        fileName: string,
        rows: T[],
        resourceService: BaseResourceServiceFull<T>
    ): void {
        this.onSaveFile(
            this.handleSpreadsheet<T>(rows, fileName, resourceService),
            fileName
        );
    }

    private handleSpreadsheet<T>(
        rows: T[],
        sheetName: string,
        resourceService: BaseResourceServiceFull<T>
    ): WorkBook {
        const header = resourceService.getHeadersForExcel();
        const workSheet = utils.json_to_sheet(rows);
        const workBook: WorkBook = utils.book_new();
        utils.book_append_sheet(workBook, workSheet, sheetName);
        utils.sheet_add_aoa(workSheet, [header]);
        return workBook;
    }

    private onSaveFile(workBook: WorkBook, fileName: string): void {
        writeFile(workBook, `${fileName}.xlsx`); // writeFileXLSX
    }
}
