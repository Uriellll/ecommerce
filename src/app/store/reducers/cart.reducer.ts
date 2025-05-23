import { createReducer, on } from "@ngrx/store";
import { ProductInterface } from "../../components/interfaces/product.interface";
import * as actions from "../actions";
import { initZone } from "zone.js/lib/zone-impl";

export interface CartState {
    products: ProductInterface[];
    totalAmount: number;
    productsCount: number;
  }
  const cartInitialState: CartState = {
    products: [],
    totalAmount: 0,
    productsCount: 0
  };
  function calculateProductsCount(products: ProductInterface[]):number{
    return products.reduce((acc,product) => acc +product.qty,0)
  }
  function calculateTotalAmount(products: ProductInterface[]):number{
    return products.reduce((acc,product) => acc +(product.price * product.qty),0)
  }
  export const cartReducer = createReducer(
    cartInitialState,
    on(actions.addCart, (state, {product}) => {
        const existing = state.products.find((pro: ProductInterface) => pro.id === product.id)
        let updatedProducts: ProductInterface[] = [];
        if(existing){
            updatedProducts = state.products.map((pro: ProductInterface)=>{
                return pro.id === product.id ? {...pro, qty: product.qty  } : pro
            })
        }else{
            updatedProducts = [...state.products, product]
        }
        const productsCount:number = calculateProductsCount(updatedProducts);
        const totalAmount: number = calculateTotalAmount(updatedProducts);
        return {
            ...state,
            products: updatedProducts,
            productsCount,
            totalAmount
        }
    }),
    on(actions.deleteCart, (state, { id }) => {
        const updatedProducts = state.products.filter((p:ProductInterface) => p.id !== id);
        const productsCount:number = calculateProductsCount(updatedProducts);
        const totalAmount: number = calculateTotalAmount(updatedProducts);
        return {
            ...state,
            products: updatedProducts,
            productsCount,
            totalAmount
        }

    }),
    on(actions.cleanCart, () => ({
        ...cartInitialState
    }))
  );