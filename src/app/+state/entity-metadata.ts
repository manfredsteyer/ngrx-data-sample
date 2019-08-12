import { EntityMetadataMap, DefaultDataServiceConfig, EntityDataModuleConfig, EntityCache, EntityCollection, EntityAction } from '@ngrx/data';
import { MetaReducer, Action } from '@ngrx/store';

const entityMetadata: EntityMetadataMap = {
  Passenger: {
    selectId: (p: Passenger) => p.id, // == Default
    sortComparer: passengerComparer,
    filterFn: passengerFilter,
    entityDispatcherOptions: {
      optimisticAdd: true,
      optimisticDelete: true,
      optimisticUpdate: true
    }
  }
};

export function passengerComparer(p1: Passenger, p2: Passenger): number {
  return p1.name.localeCompare(p2.name);
}

export function passengerFilter(all: Passenger[], search: string) {
  if (!search) {
    return all;
  }
  return all.filter(p => p.name == search);
}

export const pluralNames = { Passenger: 'passenger' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://www.angular.at/api',
  timeout: 3000, // request timeout
}

export const entityCacheMetaReducers: MetaReducer<EntityCache, Action> = reducer => {
  return (cache, action) => {
    console.debug(`entityCacheMetaReducers for Action ${action.type}`, action, cache);
    return reducer(cache, action);
  }
};

export const entityCollectionMetaReducers: MetaReducer<EntityCollection, EntityAction> = reducer => {
  return (cache, action) => {
    console.debug(`entityCollectionMetaReducers for Action ${action.type}, ${action.payload.entityName} ${action.payload.entityOp} `, action, cache);
    return reducer(cache, action);
  }
};



export interface Passenger {
    id: number;
    name: string;
    firstName: string;
    bonusMiles: number;
    passengerStatus: string;
}

// export const entityConfig: EntityDataModuleConfig = {
//   entityMetadata,
//   pluralNames,
//   entityCacheMetaReducers: [entityCacheMetaReducers],
//   entityCollectionMetaReducers: [entityCollectionMetaReducers]
// };