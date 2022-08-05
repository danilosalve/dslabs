import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {
  PoButtonGroupItem,
  PoComboOption,
  PoDisclaimer,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoSelectOption
} from '@po-ui/ng-components';
import { clone } from 'ramda';
import { Field } from './../../shared/interfaces/field';
import { FieldType } from './../../shared/interfaces/field-type.enum';

@Component({
    selector: 'app-advanced-filter',
    templateUrl: './advanced-filter.component.html'
})
export class AdvancedFilterComponent implements OnInit, OnChanges {
    @Input() fieldsTable: Field[] = [];
    @Input() disclaimer: PoDisclaimer[] = [];
    @Output() filterEvent: EventEmitter<PoDisclaimer[]> = new EventEmitter();
    disclaimerFilters: PoDisclaimer[] = [];
    fieldsList: PoComboOption[] = [];
    formField!: UntypedFormGroup;
    isDate = false;
    isString = true;
    isNumeric = false;
    isDecimal = false;
    isOpenBracket = false;
    operatorList: PoSelectOption[] = [];
    readonly operatorLogical: PoButtonGroupItem[] = [
        { label: '(', action: () => this.addOperatorLogical('(') },
        { label: ')', action: () => this.addOperatorLogical(')') },
        { label: 'e', action: () => this.addOperatorLogical(' e ') },
        { label: 'ou', action: () => this.addOperatorLogical(' ou ') }
    ];
    readonly cancel: PoModalAction = {
      action: () => {
        this.handleCancelButton();
      },
      label: 'Cancelar',
      danger: true
    };
    readonly confirm: PoModalAction = {
      action: () => {
        this.handleConfirmBtn();
      },
      label: 'Confirmar'
    };
    @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

    constructor(protected fb: UntypedFormBuilder, protected poNotification: PoNotificationService) {}

    ngOnInit(): void {
        this.operatorList = this.getOperatorList();
        this.onInitForm();
      }

      ngOnChanges(changes: SimpleChanges): void {
        this.fieldsList = this.getFieldsList();
    }

    getOperatorList(): PoSelectOption[] {
        return [
            {
                label: 'Igual a',
                value: 'eq'
            },
            {
                label: 'Diferente de',
                value: 'ne'
            },
            {
                label: 'Menor que',
                value: '<'
            },
            {
                label: 'Menor ou Igual',
                value: '<='
            },
            {
                label: 'Maior que',
                value: '>'
            },
            {
                label: 'Maior ou Igual',
                value: '>='
            },
            {
                label: 'Contém a Expressão',
                value: 'contains'
            }
        ];
    }

    getFieldsList(): PoComboOption[] {
        return this.fieldsTable.map(fields => ({
            value: fields.field,
            label: fields.label
        }));
    }

    addOperatorLogical(operator: string): void {
      if (this.isValidBracket(operator)) {
        this.addDisclaimer(operator, operator, this.getOperatorLogical(operator));
      }
    }

    getOperatorLogical(operator: string): string {
      operator = operator.trim();
      switch (operator) {
        case 'e':
          return ' and ';
        case 'ou':
          return ' or ';
        case '(':
          this.isOpenBracket = true;
          return operator;
        case ')':
          this.isOpenBracket = false;
          return operator;
        default:
          return operator;
      }
    }

    onChangeField(fieldValue: string): void {
        if (fieldValue) {
          this.formField.get('expression')?.setValue('');
          const field = this.fieldsTable.find(f => f.field === fieldValue);
          this.setFieldType(field!.type, field!.decimal);
        }
    }

    setFieldType(type: FieldType, decimal: number): void {
        this.clearTypes();
        switch (type) {
            case FieldType.STRING:
                this.isString = true;
                break;
            case FieldType.DATE:
                this.isDate = true;
                break;
            case FieldType.NUMBER:
                if (decimal > 0) {
                    this.isDecimal = true;
                } else {
                    this.isNumeric = true;
                }
                break;
            default:
                this.isString = true;
                break;
        }
    }

    clearTypes(): void {
        this.isDate = false;
        this.isDecimal = false;
        this.isNumeric = false;
        this.isString = false;
    }

    onInitForm(): void {
        this.formField = this.fb.group({
            field: ['', [Validators.required]],
            operator: ['', [Validators.required]],
            expression: ['', [Validators.required]]
        });
    }

    addFilter(): void {
      let fieldValue = this.formField.get('field')!.value;
      let fieldLabel = this.fieldsTable.find(f => f.field === fieldValue)?.label;
      const expression = this.formField.get('expression')!.value;
      const operatorValue = this.formField.get('operator')!.value;
      const operatorLabel = this.operatorList.find(o => o.value === operatorValue)?.label;

      fieldValue += ` ${operatorValue} '${expression}'`;
      fieldLabel += ` ${operatorLabel} ${expression}`;

      this.addDisclaimer(fieldValue, fieldLabel!, expression);
      this.formField.reset();
    }

    addDisclaimer(property: string, label: string, value: string | number): void {
      this.disclaimerFilters.push({property, label, value});
    }

    handleFilterButton(): void {
      this.onInitDisclaimer();
      this.poModal.open();
    }

    handleCancelButton(): void {
      this.resetModal();
      this.closeModal();
    }

    handleConfirmBtn(): void {
      if (this.canSaveFilter()) {
        this.filterEvent.emit(this.disclaimerFilters);
        this.formField.reset();
        this.closeModal();
      }
    }

    closeModal(): void {
      this.poModal.close();
    }

    resetModal(): void {
      this.disclaimerFilters = [];
      this.formField.reset();
    }

    canSaveFilter(): boolean {
      let isValid = false;
      if (this.disclaimerFilters.length > 0) {
        isValid = true;
      } else {
        this.poNotification.error('Nenhum filtro foi adicionado');
        return false;
      }

      if (!this.isValidBracket()) {
        return false
      }

      return isValid;
    }

    isValidBracket(operator = '.'): boolean {
      if (operator.trim() === ')' && this.isOpenBracket) {
        return true;
      } else {
        if (operator.trim() === ')' && !this.isOpenBracket) {
          this.poNotification.error('O parenteses de abertura não foi adicionado');
          return false;
        }

        if (this.isOpenBracket && operator.trim() === '.') {
          this.poNotification.error('Existem um parenteses em aberto');
          return false;
        }
      }
      return true;
    }

    onRemoveAll(): void {
      this.isOpenBracket = false;
    }

    onInitDisclaimer(): void {
      if (this.disclaimer.length > 0) {
        const disclaimer = clone(this.disclaimer);
        disclaimer.map(item => item.hideClose = false);
        this.disclaimerFilters = disclaimer;
      }
    }
}
