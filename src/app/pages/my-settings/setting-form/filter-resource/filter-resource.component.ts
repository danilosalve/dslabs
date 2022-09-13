import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PoSelectOption } from '@po-ui/ng-components';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

enum SEARCH_TYPE {
    EQUAL = 1,
    CONTAINS = 2
}

@Component({
    selector: 'app-filter-resource',
    templateUrl: './filter-resource.component.html'
})
export class FilterResourceComponent implements OnInit {
    @Output() changeFilter = new EventEmitter();
    formFilter!: UntypedFormGroup;

    readonly types: PoSelectOption[] = [
        { label: 'Igual', value: SEARCH_TYPE.EQUAL },
        { label: 'Contém a expressão', value: SEARCH_TYPE.CONTAINS }
    ];

    constructor(protected formBuilder: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.formFilter = this.formBuilder.group({
            code: [''],
            codeType: [SEARCH_TYPE.EQUAL],
            name: [''],
            nameType: [SEARCH_TYPE.EQUAL],
            document: [''],
            documentType: [SEARCH_TYPE.EQUAL]
        });
        this.listenChangeInForm();
    }

    listenChangeInForm(): void {
        this.formFilter.valueChanges
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(form => this.changeFilter.emit(form));
    }
}
