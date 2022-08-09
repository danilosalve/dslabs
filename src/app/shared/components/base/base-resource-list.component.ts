import { DeviceService } from '@app/shared/services/device.service';
import { AfterViewInit, Directive, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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
  protected deviceService: DeviceService

  constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceServiceFull<T>
  ) {
    this.activatedroute = injector.get(ActivatedRoute);
    this.poNotification = injector.get(PoNotificationService);
    this.titleService = injector.get(Title);
    this.deviceService = injector.get(DeviceService);
  }

  ngOnInit(): void {
    this.onDevice();
    this.getItems();
    this.onInitPage();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
  }

  onInitPage(): void {
    this.actions = this.getActions();
    this.setPageTitle();
  }

  setPageTitle(): void {
    this.activatedroute.data.subscribe(res => {
      this.titlePage = res['title'];
      this.titleService.setTitle(`DSLABs | ${res['title']}`);
    });
  }

  getItems(search?: string): void {
    this.items$ = this.resourceService.getAll()
      .pipe(
        tap(() => {
          this.items = [];
          this.isLoading = true;
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: resource => {
          if (search) {
            this.items = this.handleSearch(resource, search)
          } else  {
           this.items = resource;
          }
        },
        error: () => this.poNotification.error('Falha ao carregar Lista')
      })
  }

  onSearchResources(search: string): void {
    this.getItems(search);
  }

  onChangeDevice(device: {isSmartphone: boolean, class: string}): void {
    setTimeout(() => {
      this.classDevice = device.class;
      this.isSmartPhone = device.isSmartphone;
    }, 1000);
  }

  onDevice(): void {
    this.canViewTable = !this.deviceService.isSmartphone();
  }

  abstract getActions(): PoPageAction[];
  abstract handleSearch(resource: T[], search: string): T[];
}
