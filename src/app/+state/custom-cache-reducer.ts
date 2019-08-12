import { EntityCacheReducerFactory, EntityCache, SaveEntitiesError, EntityCollectionCreator, EntityCollectionReducerRegistry, Logger, EntityCollectionReducerFactory, EntityCollectionReducer, EntityCollection, EntityAction, EntityOp, EntityChangeTrackerBase, EntityCollectionReducerMethodsFactory, EntityChangeTracker, EntityDefinitionService } from "@ngrx/data";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomEntityCacheReducerFactory extends EntityCacheReducerFactory {

    constructor(
        entityCollectionCreator: EntityCollectionCreator, 
        entityCollectionReducerRegistry: EntityCollectionReducerRegistry, 
        logger: Logger) {
        
            super(entityCollectionCreator,  entityCollectionReducerRegistry, logger);
            console.debug('CustomEntityCacheReducerFactory::ctor');
    }

    saveEntitiesErrorReducer(
        entityCache: EntityCache, 
        action: SaveEntitiesError): EntityCache {
     
            console.debug('saveEntitiesErrorReducer', entityCache, action)
            return entityCache;
    }
}
