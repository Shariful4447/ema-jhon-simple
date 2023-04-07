import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart, setCart] = useState([])


    useEffect(()=>{
         const savedcart=getDatabaseCart();

         const productKeys =Object.keys(savedcart);
         const previousCart = productKeys.map(existingkey =>{
            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity=savedcart[existingkey]
            return product
         })
         setCart(previousCart);
    },[])

    const handleAddProduct = (product)=>{
        
        
        const productTobeAddedkey = product.key;
        const sameProduct =cart.find(pd =>pd.key === productTobeAddedkey);
       
        let newCart;
        let count = 1;
        if(sameProduct){
            count= sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others = cart.filter(pd => pd.key!== productTobeAddedkey);
            newCart = [...others,sameProduct];

        }

        else{
            product.quantity=1;
            newCart = [...cart,product];
        }
        
        setCart(newCart);
        
        addToDatabaseCart(product.key, count);
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct ={handleAddProduct}
                        product={pd}
                        ></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                    <Link to="/Review">
                        <button className='main-button'>Review Order</button>
                    </Link>
            </div>
        </div>
    );
};

export default Shop;