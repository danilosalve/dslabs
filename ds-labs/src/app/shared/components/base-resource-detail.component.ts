import { Directive, Inject, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceDetail implements OnInit {
    breadcrumb!: PoBreadcrumb;
    detailId = '';

    protected activatedroute: ActivatedRoute;
    private titleService: Title;
    private router: Router;

    constructor(
        protected injector: Injector,
        protected routeBack: string,
        @Inject(String) protected title: string
    ) {
        this.titleService = injector.get(Title);
        this.activatedroute = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
    }

    ngOnInit(): void {
        this.onInitPage();
        this.onInitResources();
        this.breadcrumb = this.getBreadCrumb();
    }

    onInitPage(): void {
        this.titleService.setTitle(`DSLABs | ${this.title}`);
        this.activatedroute.params.subscribe(
            res => (this.detailId = res['id'])
        );
    }

    handleBack(): void {
        this.router.navigate([this.routeBack]);
    }

    abstract getBreadCrumb(): PoBreadcrumb;
    abstract onInitResources(): void;
}
