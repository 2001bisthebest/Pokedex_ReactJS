import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Cart {
    pokemonName: string | undefined,
    type: string[] | undefined,
    quantity: number,
    photo: string | undefined
}

interface CartState {
    carts: Cart[]
}

const initialState: CartState = {
    carts: []
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<{ pokemonName: string | undefined, type: string[] | undefined, quantity: number, photo: string | undefined }>) => {
            const oldPokemon = state.carts.find(item => action.payload.pokemonName == item.pokemonName)
            if (oldPokemon) {
                oldPokemon.quantity += action.payload.quantity
            } else {
                state.carts.push({
                    pokemonName: action.payload.pokemonName,
                    type: action.payload.type,
                    quantity: action.payload.quantity,
                    photo: action.payload.photo
                })
            }
        },
        deleteCart: (state, action: PayloadAction<{ pokemonName: string }>) => {
            let index = state.carts.findIndex(item => item.pokemonName == action.payload.pokemonName)
            state.carts.splice(index, 1)
        },
    }
})

export default CartSlice.reducer;
export const { addCart, deleteCart } = CartSlice.actions;