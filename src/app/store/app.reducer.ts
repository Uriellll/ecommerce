import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState{
    cart: reducers.CartState,
}

export const appReducers: ActionReducerMap<AppState>={
    cart: reducers.cartReducer,

}