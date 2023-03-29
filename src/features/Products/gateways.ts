import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Product from "../../entitles/product";

const PRODUCTS_URL = "https://dummyjson.com/products";
export const fetchProducts: any = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(PRODUCTS_URL);
    return response.data.products;
  }
);
export const addProduct = createAsyncThunk<Product,Product>(
  "products/addProduct",
  async (product: Product) => {
    const response = await axios.post(`${PRODUCTS_URL}/add`, {...product, id: Date.now()});
    return response.data;
  }       
);
export const deleteProduct = createAsyncThunk<number,number>(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${PRODUCTS_URL}/${id}`);
    return id;
  }
);