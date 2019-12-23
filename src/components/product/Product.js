import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit, faTrashAlt, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function Product({ product, setRefreshList, refreshList }) {

  const [productToEdit, setProductToEdit] = useState(product);
  const [editing, setEditing] = useState(false);



  const handleEditProduct = (e) => {

    setProductToEdit({
      ...productToEdit,
      [e.target.name]: e.target.value
    })
  }

  const editProduct = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/v1.0/products/${productToEdit._id}`, productToEdit)
      .then(res => {
        console.log("Edited Product: ", res.data.data);
        setProductToEdit(res.data.data)
        setEditing(false);
      })
      .catch(err => {
        console.log('Error:', err);
      })
  }

  const deleteProduct = e => {
    e.preventDefault();
    const del = window.confirm('Are you sure you want to delete this product?');
    if (del) {
      axios
        .delete(`http://localhost:8000/api/v1.0/products/${productToEdit._id}`)
        .then(res => {
          console.log("DELETED Product: ", res)
          setRefreshList(!refreshList)
        })
        .catch(err => {
          console.log("deleteProduct error:", err);
        })
    }

  }



  return (
    <div>
      <div className="single-product-container">

        <h3>{productToEdit.name}</h3>
        <Image cloudName="dxhescd0s" publicId={productToEdit.product_images[0]} width="150" crop="scale" />

      </div>
      <div className="product-edit-delete">
        <FontAwesomeIcon icon={faEdit}
          onClick={() => setEditing(!editing)}
          className="click-icon edit" />
        <FontAwesomeIcon
          onClick={deleteProduct}
          icon={faTrashAlt} className="click-icon delete" />
      </div>
      {editing && (
        <div className="editing-form">
          <input type="text" name="name" value={productToEdit.name} onChange={handleEditProduct} />
          <input type="text" name="description" value={productToEdit.description} onChange={handleEditProduct} />
          <FontAwesomeIcon icon={faClipboardCheck}
            onClick={editProduct}
            className="click-icon submit-edit" />
        </div>
      )}
    </div>
  )
}
