import { TableStatus } from './table-status.enum';

export interface Table {
  id: number;
  table: string;
  description: string;
  status: TableStatus;
  canEdit: boolean;
  filter: string;
  isSync?: boolean
}
