import React from 'react';

const Product = (props) => {
    
    return (
        <div>
            <h1>This is Product</h1>
            <h4>{props.product.name}</h4>
        </div>
    );
};

export default Product;