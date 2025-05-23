import { createAction, props } from '@ngrx/store';
import { ProductInterface } from '../../components/interfaces/product.interface';

export const addCart = createAction('[Cart] Add Cart', props<{product: ProductInterface}>());
export const deleteCart = createAction('[Cart] Delete Cart', props<{id: number}>());
export const cleanCart = createAction('[Cart] Clean Cart');