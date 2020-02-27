import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    // actions$ is an Observable
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
    // listening on Action.LOAD_PIZZAS.
    // when LOAD_PIZZAS call the service and return a SUCCESS action with pizzas[] as payload
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          // the of operator return this as an Observable
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        );
    })
  );
}
