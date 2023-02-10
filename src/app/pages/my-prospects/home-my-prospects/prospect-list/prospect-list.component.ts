import { Component, Injector } from '@angular/core';
import { BaseResourceList } from '@app/shared/components/base/base-resource-list.component';
import { PoPageAction } from '@po-ui/ng-components';
import { Prospect } from '../../shared/interfaces/prospect';
import { ProspectService } from './../../shared/services/prospect.service';

@Component({
    selector: 'app-prospect-list',
    templateUrl: './prospect-list.component.html'
})
export class ProspectListComponent extends BaseResourceList<Prospect> {
    constructor(
        protected override injector: Injector,
        protected prospectService: ProspectService
    ) {
        super(injector, prospectService);
    }

    getActions(): PoPageAction[] {
        return [];
    }
    handleSearch(resource: Prospect[], search: string): Prospect[] {
      return resource.filter(
        prospects =>
            prospects.id?.toString().includes(search) ||
            prospects.name?.toLowerCase().includes(search.toLowerCase()) ||
            prospects.document?.toLowerCase().includes(search.toLowerCase())
    );
    }
}
