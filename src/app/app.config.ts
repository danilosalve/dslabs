// import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
// import { ApplicationConfig } from '@angular/platform-browser';
// import { PoNotificationModule } from '@po-ui/ng-components';
// import { AppInitService } from './appInit.service';

// export const loadAppConfigProvider: FactoryProvider = {
//   provide: APP_INITIALIZER,
//   useFactory: () => {
//     const appInitService = inject(AppInitService);
//     return () => appInitService.isNewURLServer();
//   },
//   multi: true // habilita a injeção do APP_INITIALIZER várias vezes
//   // deps: [AppInitService] // deps não é mais necessario graças a função inject.
// };

// export const appConfig: ApplicationConfig = {
//   providers: [PoNotificationModule, loadAppConfigProvider]
// }
