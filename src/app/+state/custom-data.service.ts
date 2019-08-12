import { DefaultDataService, HttpMethods, DefaultDataServiceFactory, EntityCollectionDataService, EntityCacheReducerFactory, EntityCache, SaveEntitiesError } from "@ngrx/data";
import { Passenger } from "./entity-metadata";
import { Observable } from "rxjs";

export class LoggingEntityDataService<T> extends DefaultDataService<T> /* implements EntityCollectionDataService<Passenger>*/ {
    protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
        console.debug(`Called execute do perform a ${method} call on ${url}`, data, options);
        return super.execute(method, url, data, options);        
    }
}

export class CustomPassengerEntityDataService extends LoggingEntityDataService<Passenger> /* implements EntityCollectionDataService<Passenger>*/ {
}

export class CustomDataServiceFactory extends DefaultDataServiceFactory {
    create<T>(entityName: string): EntityCollectionDataService<T> {
        return new LoggingEntityDataService<T>(entityName, this.http, this.httpUrlGenerator, this.config);
    }
}

