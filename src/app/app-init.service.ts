import { Injectable, inject } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable()
export class AppInitService {
  private _poNotificationService = inject(PoNotificationService);

  Init(): Promise<void> {
    return new Promise<void>(resolve => {
      if (this._isItADevelopmentServer()) {
        this._poNotificationService.information('Atenção você está utilizando um servidor de desenvolvimento');
      } else if (this._isItAProductionServer()) {
        this._poNotificationService.information('Atenção está aplicação utiliza dados fictícios para simular um servidor.');
      }
      resolve();
    });
  }

  private get _url(): string {
    return location.href;
  }

  private _isItADevelopmentServer(): boolean {
    return this._url.includes('localhost:')
  }

  private _isItAProductionServer(): boolean {
    return this._url.includes('gestao-de-vendas-labs.web.app')
  }

}
