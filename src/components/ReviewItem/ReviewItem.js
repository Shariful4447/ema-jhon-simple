import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const{name, quantity}=props.product;
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
            <br />
            <button className='main-button'>Review Item</button>
        </div>
    );
};

export default ReviewItem;