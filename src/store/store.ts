import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartReducer from './cartSlice';

const loadState = () => {
    try {
        const getState = localStorage.getItem('reduxState');
        if (getState === null) {
            return undefined;
        }
        return JSON.parse(getState);
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

const persistedState = loadState();

const store: any = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: persistedState,
})

store.subscribe(() => {
    try {
        const getState = JSON.stringify(store.getState());
        localStorage.setItem('reduxState', getState);
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
export default store;