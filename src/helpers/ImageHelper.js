import React from 'react';
import { ImageAPI } from '../backend';
console.log(ImageAPI);

const defaultImageApi =
  'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `http://192.168.27.12:81/IMAGE/PRD/1.jpg`
    : `${defaultImageApi}`;
  console.log(imageURL);
  return (
    <div className='rounded'>
      <img
        src={defaultImageApi}
        alt='product'
        style={{
          display: 'block',
          margin: '15px auto 10px',
          maxHeight: '250px',
        }}
        className='img-fluid '
      />
    </div>
  );
};

export default ImageHelper;
