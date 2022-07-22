import { FieldType } from './field-type.enum';

export interface Field {
  id: number;
  tableId: number;
  label: string;
  description: string;
  field: string;
  type: FieldType;
  lenght: number;
  decimal: number;
}
