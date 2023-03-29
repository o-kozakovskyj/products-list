import { nanoid } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Product from "../../entitles/product";
import { addProduct } from "../../features/Products/gateways";
import { getProductsStatus, getProductsError } from "../../features/Products/productsSlice";
import "./Modal.scss";
type ModalProps = {
  handleClose: () => void;
  modalTitle: string;
};
const Modal: React.FC<ModalProps> = ({ handleClose, modalTitle }) => {
  const dispatch = useAppDispatch();
  interface ModalFormValues extends Product {
    title: string;
    description: string;
    price: number|string;
    thumbnail: string;
    rating: number|string;
    stock: number| string;
    category: string;
  }
  const initialFormValues: ModalFormValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    rating: "",
    stock: "",
    category: "",
    id: 0,
    discountPercentage: 0,
    brand: "",
    images: []
  };
  const formik = useFormik({
    initialValues: initialFormValues,  
    onSubmit: (values: Product, actions) => {
      dispatch(addProduct({...values, id: nanoid()}));
      handleClose();
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(200, 'Must be 20 characters or less')
        .required('Required'),
      price: Yup.number()
        .min(1, 'Must be 1 or more'),
      thumbnail: Yup.string(),
      rating: Yup.number(),
      stock: Yup.number(),
      category: Yup.string()
    }),
  });
  const handleModalClose = (e: any) => {
    if (e.target.className === "modal") {
      handleClose()
    }
    e.stopPropagation();
  };
  const productsStatus = useAppSelector(getProductsStatus);
  const error = useAppSelector(getProductsError);
  
  if (productsStatus === "failed") {
    return <div>{error}</div>;
  }
  return (
    <div className="modal" onClick={handleModalClose}>
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{modalTitle}</h2>
          <button className="modal__close" onClick={handleClose}>
            <img src="./close.svg" alt="close button" />
          </button>
        </div>
        <div className="modal__body">
          <form onSubmit={formik.handleSubmit}>
            <div className="input__box">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                value={formik.values.title}
                id="title"
                onChange={formik.handleChange}
                className={`modal__input ${formik.touched.title && formik.errors.title ? 'modal__error-text' : 'modal__success'}`}
              />
              <span className='modal__error-text'>{formik.errors.title}</span>
            </div>
            <div className="input__box">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={`modal__input ${formik.touched.description && formik.errors.description ? 'modal__error-text' : 'modal__success'}`}
              />
              <span className='modal__error-text'>{formik.errors.description}</span>
            </div>
            <div className="input__box">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className={`modal__input ${formik.touched.price && formik.errors.price ? 'modal__error-text' : 'modal__success'}`}
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              <span className='modal__error-text'>{formik.errors.price}</span>
            </div>
            <div className="input__box">
              <label htmlFor="thumbnail">Thumbnail</label>
              <input
                type="text"
                id="thumbnail"
                className={`modal__input ${formik.touched.thumbnail && formik.errors.thumbnail ? 'modal__error-text' : 'modal__success'}`}
                value={formik.values.thumbnail}
                onChange={formik.handleChange}
              />
              <span className='modal__error-text'>{formik.errors.thumbnail}</span>
            </div>
            <div className="input__box">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                className={`modal__input ${formik.touched.rating && formik.errors.rating ? 'modal__error-text' : 'modal__success'}`}
                value={formik.values.rating}
                onChange={formik.handleChange}
              />
              <span className='modal__error-text'>{formik.errors.rating}</span>
            </div>
            <div className="input__box">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                className={`modal__input ${formik.touched.stock && formik.errors.stock ? 'modal__error-text' : 'modal__success'}`}
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              <span className='modal__error-text'>{formik.errors.stock}</span>
            </div>
            <div className="input__box">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className={`modal__input ${formik.touched.category && formik.errors.category ? 'modal__error-text' : 'modal__success'}`}
                value={formik.values.category}
                onChange={formik.handleChange}
              />
              <span className='modal__error-text'>{formik.errors.category}</span>
            </div>
            <button className="modal__submit" type="submit" >
              {productsStatus === "loading" ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Modal;