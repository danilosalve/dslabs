import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '@app/shared/services/device.service';
import { ExcelService } from '@app/shared/services/excel.service';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { BaseResourceServiceFull } from '../../services/base-resource-full.service';
import { DEVICE_BUTTON_STYLE } from '../view-button/view-button.component';

@Directive()
export abstract class BaseResourceList<T> implements OnInit, OnDestroy {
    actions: PoPageAction[] = [];
    isLoading = true;
    items: T[] = [];
    items$ = new Subscription();
    titlePage = '';
    isSmartPhone = false;
    classDevice: string = DEVICE_BUTTON_STYLE;
    canViewTable = true;

    private titleService: Title;
    protected poNotification: PoNotificationService;
    protected activatedroute: ActivatedRoute;
    protected deviceService: DeviceService;
    protected excelService: ExcelService;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceServiceFull<T>
    ) {
        this.activatedroute = injector.get(ActivatedRoute);
        this.poNotification = injector.get(PoNotificationService);
        this.titleService = injector.get(Title);
        this.deviceService = injector.get(DeviceService);
        this.excelService = injector.get(ExcelService);
    }

    ngOnInit(): void {
        this.onDevice();
        this.getItems();
        this.onInitPage();
        this.listenLoading();
    }

    ngOnDestroy(): void {
        this.items$.unsubscribe();
    }

    onInitPage(): void {
        this.actions = this.getActions();
        this.actions.push({
            label: 'Exportar dados',
            action: () => this.onExportData(),
            icon: 'po-icon-export',
            type: 'default'
        });
        this.setPageTitle();
    }

    setPageTitle(): void {
        this.activatedroute.data.subscribe(res => {
            this.titlePage = res['title'];
            this.titleService.setTitle(`DSLABs | ${res['title']}`);
        });
    }

    listenLoading(): void {
      this.resourceService.loading.subscribe(() => (this.isLoading = false));
    }

    getItems(search?: string): void {
        this.items$ = this.resourceService
            .getAll()
            .pipe(
                tap(() => {
                    this.items = [];
                    this.isLoading = true;
                }),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: resource => {
                    if (search) {
                        this.items = this.handleSearch(resource, search);
                    } else {
                        this.items = resource;
                    }
                },
                error: () =>
                    this.poNotification.error('Falha ao carregar Lista')
            });
    }

    onSearchResources(search: string): void {
        this.getItems(search);
    }

    onChangeDevice(device: { isSmartphone: boolean; class: string }): void {
        setTimeout(() => {
            this.classDevice = device.class;
            this.isSmartPhone = device.isSmartphone;
        }, 1000);
    }

    onDevice(): void {
        this.canViewTable = !this.deviceService.isSmartphone();
    }

    onExportData(): void {
        this.excelService.onGenerateFile<T>(
            this.titlePage,
            this.items,
            this.resourceService
        );
    }

    abstract getActions(): PoPageAction[];
    abstract handleSearch(resource: T[], search: string): T[];
}
