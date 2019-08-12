import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntityDataModule, DefaultDataServiceConfig, DefaultDataServiceFactory, EntityCollectionReducerFactory } from '@ngrx/data';
import { entityConfig, defaultDataServiceConfig } from './+state/entity-metadata';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PassengerSearchComponent } from './passengers/passenger-search.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomDataServiceFactory } from './+state/custom-data.service';
import { CustomEntityCollectionReducerFactory } from './+state/custom-entity-reducer-factory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    EntityDataModule.forRoot(entityConfig),
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    PassengerSearchComponent
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: DefaultDataServiceFactory, useClass: CustomDataServiceFactory },
    { provide: EntityCollectionReducerFactory, useClass: CustomEntityCollectionReducerFactory}
    // { provide: EntityCollectionReducerMethodsFactory, useClass: CustomEntityCollectionReducerMethodsFactory }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(
  //   dataService: EntityDataService,
  //   http: HttpClient,
  //   httpUrlGenerator: HttpUrlGenerator,
  //   config: DefaultDataServiceConfig
  //   ) {

  //   dataService.registerService<Passenger>('Passenger', new CustomPassengerEntityDataService('Passenger', http, httpUrlGenerator, config));
  // }
}
