import { BaseResource } from './base-resource';

export interface State extends BaseResource {
    uf: string;
    name: string;
}
