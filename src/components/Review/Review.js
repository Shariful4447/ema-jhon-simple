import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearLocalShoppingCart } from '../../utilities/databaseManager';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const handleProccedCheckout = ()=>{

      // setCart([]);
      // setOrderPlaced(true);
      // clearLocalShoppingCart();

      // console.log("order placed");
      navigate('/Shipment');

    }
    
    const removeProduct = (productKey)=> {
        console.log("product removed", productKey);
        const newCart = cart.filter(product => product.key!== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key ===key);
            product.quantity = savedCart[key];
            return product
        });
        setCart(cartProducts);
    
    }, [])

    let thankyou;
    if(orderPlaced){
      thankyou = <img src={happyImage} alt="" />
    }
     

    return (
        <div  className='twin-container'>
            
          <div className='product-container'>
          {
            cart.map(pd => <ReviewItem
                 key={pd.key} 
                 removeProduct={removeProduct}
                 product= {pd}></ReviewItem>)
            }

            {thankyou}
              

          </div>
          <div className='cart-container'>

            <Cart cart={cart}>
               <button onClick={handleProccedCheckout} className='main-button'>Procced Checkout</button>
            </Cart>
          </div>
        </div>
    );
};

export default Review;