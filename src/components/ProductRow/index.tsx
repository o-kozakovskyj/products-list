import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type Product from "../../entitles/product";
import { deleteProduct } from "../../features/Products/gateways";
import { getProductsError, getProductsStatus } from "../../features/Products/productsSlice";
import "./ProductRow.scss";

  
const ProductRow: React.FC<Product> = (product) => {
  
  const { title, id, description, price, thumbnail, rating, stock, category } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalSwitch = () => {
    setIsModalOpen(!isModalOpen);
  };
  const dispatch = useAppDispatch();
  const handleDeleteProduct = (id: any) => { 
    //ToDo: remove when the bug will be fixed
    if (id === 101) {
      alert("You can't delete product with id = 101 because it's a Api bug");
    } else {
       dispatch(deleteProduct(id));
    }
  };
  const productsStatus = useAppSelector(getProductsStatus);
  const error = useAppSelector(getProductsError);
  if (productsStatus === "loading") {
    return <div className="products__empty">Loading...</div>;
  }
  if (productsStatus === "failed") {
    return <div>{error}</div>;
  }
  return (
  <>
    <tr className="products__row" onClick={handleModalSwitch}>
    <td className="products__row-item product__row-item-id">{id}</td>
    <td className="products__row-item">{title}</td>
      <td className="products__row-item product__row-item-id">{description}</td>
    <td className="products__row-item">{price}</td>
    <td className="products__row-item products__logo">
      <div className="products__img-box">
          <img src={thumbnail} alt={title} className="products__img" />
      </div>
    </td>
    <td className="products__row-item">{rating}</td>
      <td className="products__row-item">{stock}</td>
        <td className="products__row-item">
          {category}          
        </td>
        <td>
          <button onClick={()=>handleDeleteProduct(id)} className="products__row-button">X</button>  
        </td>
    </tr>   
  </>
   
  );
} 
export default ProductRow;