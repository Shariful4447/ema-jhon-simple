import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    const {img, name, seller, price, stock} =props.product;
    
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
                <p><small>Only {stock}item Left.</small></p>
                
                <button className='main-button' onClick={()=>props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;