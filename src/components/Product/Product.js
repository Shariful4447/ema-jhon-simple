import React from 'react';
import './Product.css'

const Product = (props) => {
    const {img, name, seller, price} =props.product;
    
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div> 
                <h4 className='product-name'>{name}</h4>
                <br />
                <p><small>By : {seller}</small></p>
                <br />
                <p>Price: ${price} </p>
                <br />
                <button>Buy Now</button>
            </div>
        </div>
    );
};

export default Product;