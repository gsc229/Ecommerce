import React, { useState, useEffect } from 'react';
import Product from './Product';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import NewProductForm from '../product/NewProductForm';
import axios from 'axios';

export default function ProductList(props) {

  const [addingProduct, setAddgingProduct] = useState(false);
  const [products, setProducts] = useState([{}]);
  const [loadingList, setLoadingList] = useState(true);
  const [refreshList, setRefreshList] = useState(false);
  console.log('ProductsList products: ', products);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1.0/vendors/${props.vendorInfo._id}/products`)
      .then(res => {
        console.log('ProductList res', res);
        setProducts(res.data.data);
        setLoadingList(false);
      })
      .catch(err => {
        console.log('ProductList err', err);
      })
  }, [props.vendorInfo, refreshList])

  return (
    <div>

      <h1>Hi! ProductList</h1>
      <div onClick={() => setAddgingProduct(!addingProduct)} className="add-products">
        <p>Add Product <FontAwesomeIcon icon={faPlus} /></p>
      </div>
      {addingProduct && (<NewProductForm />)}
      {loadingList ? (<h2>Loading Vendor's Products...</h2>) : (
        <div className="product-list">
          {products.map(product => (
            <Product
              key={product._id}
              product={product}
              setRefreshList={setRefreshList}
              refreshList={refreshList}
            />
          ))}
        </div>
      )}
    </div>
  )
}
