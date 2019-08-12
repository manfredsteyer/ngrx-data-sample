import { EntityCollectionReducerMethodsFactory, EntityCollectionReducerMethodMap, EntityOp, EntityDefinitionService, EntityCollectionReducerMethods, EntityCollection, EntityAction, EntityActionDataServiceError, EntityDefinition, EntityChangeTracker, EntityActionFactory } from "@ngrx/data";
import { Injectable } from "@angular/core";

export class CustomEntityCollectionReducerMethods<T> 
                extends EntityCollectionReducerMethods<T> {

    constructor(
        entityName: string, 
        def: EntityDefinition<T>, 
        private actionFactory: EntityActionFactory
    ) {
        super(entityName, def);
    }

    saveAddOneError(collection: EntityCollection<T>, action: EntityAction<EntityActionDataServiceError>) {
        console.debug('CustomEntityCollectionReducerMethods:saveAddOneError');
        const entity = action.payload.data.originalAction.payload.data;
        const newAction = this.actionFactory.create<T>('Passenger', EntityOp.UNDO_ONE, entity);
        return super.undoOne(collection, newAction);
    }

}

@Injectable()
export class CustomEntityCollectionReducerMethodsFactory
    extends EntityCollectionReducerMethodsFactory {

        constructor(
            private eds: EntityDefinitionService,
            private eaf: EntityActionFactory
        ) {
            super(eds);
        }

        create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
            console.debug('CustomEntityCollectionReducerMethodsFactory:create');
            const definition = this.eds.getDefinition<T>(entityName);
            const methodsClass = new CustomEntityCollectionReducerMethods(entityName, definition, this.eaf);
            return methodsClass.methods;
        }
}