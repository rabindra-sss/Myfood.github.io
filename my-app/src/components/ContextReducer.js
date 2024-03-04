import React, { createContext, useContext, useReducer } from 'react'

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const initialstate= [];
const reducer = (state, action)=> {
    
    switch(action.type) {
        case "CLEAR": {
            return ([])
        }
        case "ADD": {
            return ([...state, action.data]);
        }
        case "REMOVE": {
            let array= [...state];
            array.splice(action.index, 1);
            return array;
        }
        case "INCREASEQUANT":{
            let array= [...state];
            let i=action.index;
            array[i].qty =parseFloat(array[i].qty)+0.5;
            if(array[i].qty<1) array[i].qty=1;
            if(array[i].qty>6) array[i].qty =6;
            
            array[i].finalPrice= array[i].qty * parseInt(array[i].price);
            array[i].qty= array[i].qty.toString()
            return array;
        }
        case "DECREASEQUANT":{
            let array= [...state];
            let i=action.index;
            array[i].qty =parseFloat(array[i].qty)-0.5;
            if(array[i].qty<1) array[i].qty=1;
            if(array[i].qty>6) array[i].qty =6;
            
            array[i].finalPrice= array[i].qty * parseInt(array[i].price);
            array[i].qty= array[i].qty.toString()
            return array;
        }
        default: ;
    }

}

export default function CartProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialstate)
  return (
        <cartStateContext.Provider value={state}>
            <cartDispatchContext.Provider value={dispatch}>
                {children}
            </cartDispatchContext.Provider>
        </cartStateContext.Provider>
  )
}

export const useCart = ()=> useContext(cartStateContext);
export const useDispatch = ()=> useContext(cartDispatchContext);


