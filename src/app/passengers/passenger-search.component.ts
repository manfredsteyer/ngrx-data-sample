import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PassengerService } from './passenger.service';
import { Observable } from 'rxjs';
import { EntityActionFactory, EntityOp, EntityCacheDispatcher } from '@ngrx/data';
import { Passenger } from '../+state/entity-metadata';

@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerSearchComponent implements OnInit {

  constructor(
    private ecd: EntityCacheDispatcher,
    private actionFactory: EntityActionFactory,
    private passengerService: PassengerService) {
  }

  passengers$: Observable<Passenger[]>;
  loading$: Observable<boolean>;

  ngOnInit() {
    // this.passengers$ = this.passengerService.entities$;
    this.passengers$ = this.passengerService.filteredEntities$;
    this.loading$ = this.passengerService.loading$;
  }

  load() {
    this.passengerService.getAll();
  }

  add() {
    const p: Passenger = { id: 0, name: 'Steyer', firstName: 'Manfred', bonusMiles: 0, passengerStatus: 'A'};
    this.passengerService.add(p, { correlationId: 17, tag: '20' }).subscribe(
      s => console.debug('success', s),
      e => {
        console.error('error', e);
        const action = this.actionFactory.create('Passenger', EntityOp.UNDO_ONE, 0);
        this.passengerService.store.dispatch(action);
      }
    );
  }


  filter() {
    this.passengerService.setFilter('Doe');
  }

}
