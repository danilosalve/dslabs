import { Directive, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceDetail implements OnInit {
    breadcrumb!: PoBreadcrumb;
    detailId = '';
    titlePage = '';

    protected activatedroute: ActivatedRoute;
    private titleService: Title;
    private router: Router;

    constructor(protected injector: Injector, protected routeBack: string) {
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
        this.activatedroute.params.subscribe(
            res => (this.detailId = res['id'])
        );

        this.activatedroute.data.subscribe(res => {
            this.titlePage = res['title'];
            this.titleService.setTitle(`DSLABs | ${res['title']}`);
        });
    }

    handleBack(): void {
        this.router.navigate([this.routeBack]);
    }

    abstract getBreadCrumb(): PoBreadcrumb;
    abstract onInitResources(): void;
}
