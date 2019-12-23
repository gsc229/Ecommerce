import React, { useState } from 'react'

export default function ImageUploader() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(image);

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0])
    data.append('upload_preset', 'quickstreet')
    setLoading(true)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dxhescd0s/image/upload`,
      {
        method: 'POST',
        body: data, 
        return_delete_token: 1
      }
    );

    const file = await res.json()
    console.log('ImageUploader file:', file)
    setImage(file.secure_url)
    setLoading(false)

  }
  return (
    <div>
      <h3>Upload Image</h3>
      <input type="file"
        name='file'
        placeholder='Upload an image'
        onChange={uploadImage}
      />
      {loading ? (<h3>Loading...</h3>) : (<img src={image} style={{ width: '300px' }} />)}
    </div>
  )
}
