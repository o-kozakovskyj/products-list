import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type Product from "../../entitles/product";
import { RootState } from "../../app/store";
import { addProduct, deleteProduct, fetchProducts } from "./gateways";

interface InitialState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  columnToSort: keyof Product;
  sortType: "asc" | "desc" | "";
  queryParams: object;
}
const initialState: InitialState = {
  products: [],
  status: "idle",
  error: null,
  searchTerm: "",
  columnToSort: "id",
  sortType: "",
  queryParams: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setColumnToSort: (state, action: PayloadAction<keyof Product>) => {
      state.columnToSort = action.payload as keyof Product;
    },
    setSortType: (state) => {
      state.sortType = state.sortType === "asc" ? "desc" : "asc";
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload)
        state.status = "succeeded";
        state.error = null;
        
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.payload;
        state.products = state.products.filter((product) => product.id.toString() !== id.toString());
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.queryParams = action.payload.queryParams;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.queryParams = {};
        }
      );
  },
});

export const selectProductBySearchTerm = (state: RootState) => {
  const { searchTerm, products, columnToSort, sortType } = state.products;
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "asc") {
      return a[columnToSort] > b[columnToSort] ? 1 : -1;
    } else if (sortType === "desc") {
      return a[columnToSort] < b[columnToSort] ? 1 : -1;
    } else {
      return 0;
    }
  });
  if (searchTerm === "") { return sortedProducts; }
  return sortedProducts.filter((product: Product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase());
  });
};
export const currentQueryParams = (state: RootState) => state.products.queryParams;
export const columnToSort = (state: RootState) => state.products.columnToSort;
export const sortType = (state: RootState) => state.products.sortType;
export const { filterProducts, setColumnToSort, setSortType, removeProduct} = productsSlice.actions;
export const getProductsStatus = (state: RootState) => state.products.status;
export const getProductsError = (state: RootState) => state.products.error;
export default productsSlice.reducer;