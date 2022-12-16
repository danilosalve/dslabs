import { BaseResource } from './base-resource';

export interface City extends BaseResource {
    state: string;
    name: string;
}
