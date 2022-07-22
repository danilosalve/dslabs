import { Directive, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';

@Directive()
export abstract class BaseResourceForm implements OnInit {
    breadcrumb!: PoBreadcrumb;
    currentAction = '';
    isDisableSubmit = true;
    resourceId!: string | number;
    titlePage = '';

    protected activatedroute: ActivatedRoute;
    protected poNotification: PoNotificationService;
    private router: Router;
    private titleService: Title;

    constructor(protected injector: Injector, protected routeBack: string) {
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
    /*
    protected loadResource(): void {
      if (this.currentAction === 'edit') {
        this.route.paramMap.pipe(
          switchMap(params => this.resourceService.getById(+params.get('id')))
        )
        // tslint:disable-next-line: deprecation
        .subscribe(
          resource => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
        },
        () => toastr.error('Ocorreu um erro no servidor, tenta mais tarde.')
        );
      }
    }
*/

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
}
