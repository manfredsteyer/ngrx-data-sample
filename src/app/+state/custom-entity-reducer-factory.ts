import { EntityCollectionReducerFactory, EntityCollectionReducer, EntityCollection, EntityAction, EntityOp, EntityCollectionReducerMethodsFactory, EntityDefinitionService } from "@ngrx/data";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomEntityCollectionReducerFactory extends EntityCollectionReducerFactory {
    
    constructor(
        methodsFactory: EntityCollectionReducerMethodsFactory,
        private entityDefinitionService: EntityDefinitionService
        ) {
        super(methodsFactory);
    }
    
    create<T = any>(entityName: string): EntityCollectionReducer<T> {
        console.debug('CustomEntityCollectionReducerFactory:create');
        const defaultReducer = super.create(entityName);
        const def = this.entityDefinitionService.getDefinition(entityName);

        return function entityCollectionReducer(
            collection: EntityCollection<T>,
            action: EntityAction): EntityCollection<T> {

            switch(action.payload.entityOp) {
                case EntityOp.SAVE_ADD_ONE_ERROR: {
                    const id = action.payload.data.originalAction.payload.data.id;

                    console.debug('SAVE_ADD_ONE_ERROR');
                    console.debug('id', id);
                    console.debug('changeState', collection.changeState[0]);
                    console.debug('collection', collection);

                    // return changeTracker.undoOne(id, collection);
                    
                    // Alternative: Call methodsFactory.create(entityName).undoOne(...)
                }
                default: {
                    return defaultReducer(collection, action);
                }
            }

        };

    }
}