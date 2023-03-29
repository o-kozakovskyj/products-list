import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/Products/productsSlice';
import { productsApi } from '../services/ProductsService';

const rootReduser = {
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
};
export const store = configureStore({
  reducer: rootReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;