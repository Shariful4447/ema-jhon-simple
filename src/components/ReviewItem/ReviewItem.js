import React from 'react';

const ReviewItem = (props) => {
    
    const{name, quantity, key ,price}=props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft:'200px'


    }
    return (
        <div style={reviewItemStyle} className='review-item'>
            <h4>Product Name : {name}</h4>
            <h4>Quantity : {quantity}</h4>
            <h4>Price Per quantity : $ {price}</h4>
            <br />
            <button
            onClick={() => props.removeProduct(key)} 
            className='main-button'>Remove Item</button>
        </div>
    );
};

export default ReviewItem;