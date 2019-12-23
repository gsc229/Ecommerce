import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../product/Product';
import ProdcutList from '../product/ProductList';

export default function VendorProfile() {

  const [vendorInfo, setVendorInfo] = useState({});

  console.log("VendorProfile vendorInfo: ", vendorInfo)
  console.log("VendorProfile, vendorInfo._id", vendorInfo._id);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1.0/vendors/5d725a1b7b292f5f8ceff788')
      .then(res => {
        const vendorId = res.data.data._id;
        setVendorInfo(res.data.data);

      })
      .catch(err => {
        console.log("VendorProfile err: ", err)
      })
  }, [])




  return (
    <div>
      <h1>Hi! VendorProfile of {vendorInfo.business_name}</h1>
      <h6>{vendorInfo.description}</h6>
      <div className="bulletin">
        <p>{vendorInfo.bulletin}</p>
      </div>
      <ProdcutList vendorInfo={vendorInfo} />
    </div>
  )
}
