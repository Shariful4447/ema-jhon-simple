import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //By Reduce 
    //const total = cart.reduce((total,prd) => total + prd.price,0)
    //By using Normal way
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
        
    }

    let shipping=0;
    if (total>35) {
        shipping = 0;
        
    }
    else if (total>15) {
        shipping = 4.99;
        
    }
    else if (total>0) {
        
        shipping = 12.99;
    }

    const tax =(total/10).toFixed(2);

    const grandTotal =(total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h3>Order Summery</h3>
            <h5>Items order: {cart.length}</h5>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Vat + Tax: {tax}</p>
            <p>Total Price: {grandTotal}</p>
            <button>Review Order</button>
        </div>
    );
};

export default Cart;