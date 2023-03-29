import Product from "../../entitles/product";
import ProductRow from "../../components/ProductRow";
import { useEffect } from "react";
import "./Products.scss";
import {
  getProductsStatus,
  getProductsError,
  filterProducts,
  selectProductBySearchTerm,
  setColumnToSort,
  setSortType
} from "./productsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "./gateways";

type ProductsProps = {
  search: string,
};
const Products: React.FC<ProductsProps> = ({ search }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductBySearchTerm);
  const productsStatus = useAppSelector(getProductsStatus);
  const error = useAppSelector(getProductsError);
  useEffect(() => {
    dispatch(filterProducts(search))
    if (productsStatus === "idle") {
      dispatch(fetchProducts());     
    }
  }, [productsStatus, dispatch, search]);

  const handleSort = (header: keyof Product) => {
    dispatch(setColumnToSort(header))
    dispatch(setSortType())
  };
  if (productsStatus === "loading") {
    return <div className="products__empty">Loading...</div>;
  }
  if (productsStatus === "failed") {
    return <div>{error}</div>;
  }
  if (products.length === 0) {
    return <div className="products__empty">No products found</div>;
  }
  return (
    <table className="products">
      <thead>
        <tr>  
          <th onClick={() => handleSort("id")} className="products__sort">Id</th>
          <th onClick={() => handleSort("title")} className="products__sort">Name</th>
          <th onClick={() => handleSort("description")} className="products__sort">Description</th>
          <th onClick={() => handleSort("price")} className="products__sort">Price</th>
          <th>Photo</th>
          <th onClick={() => handleSort("rating")} className="products__sort">Rating</th>
          <th>Stock</th>
          <th onClick={() => handleSort("category")} className="products__sort">Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: Product) => (
          <ProductRow {...product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
};
export default Products;
