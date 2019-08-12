import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Passenger } from '../+state/entity-metadata';

@Injectable({ providedIn: 'root' })
export class PassengerService extends EntityCollectionServiceBase<Passenger> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Passenger', serviceElementsFactory);
    }
}

