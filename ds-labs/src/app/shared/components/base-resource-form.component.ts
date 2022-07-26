import { Directive, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceForm implements OnInit {
    breadcrumb!: PoBreadcrumb;
    currentAction = '';
    isDisableSubmit = true;
    resourceId!: string | number;
    titlePage = '';
    fields: PoDynamicFormField[] = [];

    protected activatedroute: ActivatedRoute;
    protected poNotification: PoNotificationService;
    private router: Router;
    private titleService: Title;

    constructor(
        protected injector: Injector,
        protected routeBack: string,
        protected isPage: boolean
    ) {
        this.activatedroute = injector.get(ActivatedRoute);
        this.poNotification = injector.get(PoNotificationService);
        this.router = injector.get(Router);
        this.titleService = injector.get(Title);
    }

    ngOnInit(): void {
        this.onInitPage();
    }

    onInitPage(): void {
        this.setCurrentAction();
        this.breadcrumb = this.getBreadCrumb();

        if (!this.isPage) {
          this.fields = this.getFields();
        }

        if (this.isEdit()) {
            this.activatedroute.params.subscribe(
                res => (this.resourceId = res['id'])
            );
        }

        this.activatedroute.data.subscribe(res => {
            this.titlePage = res['title'];
            this.titleService.setTitle(`DSLABs | ${res['title']}`);
        });
    }

    handleBack(): void {
        this.router.navigate([this.routeBack]);
    }

    getResourceByActivatedroute(route: string): any {
      return this.activatedroute.snapshot.data[route];
    }

    protected setCurrentAction(): void {
        if (this.activatedroute.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    protected isEdit(): boolean {
        return this.currentAction === 'edit';
    }

    abstract getBreadCrumb(): PoBreadcrumb;
    abstract onSubmit(): void;
    abstract getFields(): PoDynamicFormField[];
}
