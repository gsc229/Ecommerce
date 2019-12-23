import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { CloudinaryContext } from "cloudinary-react"

export default function NewProductForm() {

  const [newProduct, setNewProduct] = useState({});


  return (
    <div className="new-product-form-container">
      <h3>Enter Product Details</h3>
      <form action="" className="new-product-form" >
        <input type="text" name="name" />
        <input type="text" name="description" />
        <input type="number" name="price" min="0" />
        <input type="" />
      </form>
      <ImageUploader setNewProduct={setNewProduct} />
    </div>
  )
}
