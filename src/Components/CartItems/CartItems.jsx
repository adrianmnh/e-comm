import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom';

const CartItems = () => {
	const { allProduct, cartItems, addToCart, removeFromCart, removeItemFromCart, getTotalCartAmount } = useContext(ShopContext);
	return (
		<div className="cartitems">
			<div className="cartitems-format-main">
				<p>Product</p>
				<div className="item-right">
					<p>Title</p>
					<p className="center">Price</p>
					<p className="center">Quantity</p>
					<p className="center">Total</p>
					<p className="center">Remove</p>

				</div>
			</div>
			<hr />

			{
				!cartItems.size && <div className="empty-cart-placeholder"></div>
			}

			{/* { allProduct && allProduct.map((e)=> { */}
			{Array.from(allProduct.entries()).map(([key, e]) => {

				const cartItemSizes = cartItems.get(e.id)
				if (!cartItemSizes) return null

				const price = !e.sale_price ? e.retail_price : e.sale_price;
				const linkName = e.linkName
				const productCategory = e.category

					return Array.from(cartItems.get(e.id)).map(([size, quantity]) =>  (
						<div key={`${e.id}-${size}`}>
							<div className="cartitems-format cartitems-format-main">
								<Link to={`/shop/${productCategory}/${linkName}`}><img src={e.image} className="cartitems-product-icon" /></Link>
								<div className="item-right">

									<div>
									<p className="item-name">{e.name}</p>
									<p className="item-size">size: {size.toUpperCase()}</p>
									</div>
									<p className="item-remove" onClick={() => { removeItemFromCart(e.id) }}>Remove</p>
									<p className="item-price center"><span className='item-price-currency'>＄</span>{price.toFixed(2)}</p>
									<div className="cartitems-quantity-container">
										<button onClick={() => { removeFromCart(e.id, size) }} className="cartitems-quantity-change">➖</button>
										<button className="cartitems-quantity">{quantity}</button>
										<button onClick={() => { addToCart(e.id, size) }} className="cartitems-quantity-change">➕</button>
									</div>
									<p className="item-total center"><span className='item-price-currency'>＄</span>{(price * quantity).toFixed(2)}</p>
									<img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeItemFromCart(e.id, size) }} alt="" />

								</div>
							</div>
							<hr />
						</div>
					)
					)

				// })
			})}

			<div className="cartitems-down">
				<div className="cartitems-total">
					<h1>Cart Totals</h1>
					<div>
						<div className="cartitems-total-item">
							<p>Substotal</p>
							<p>${getTotalCartAmount()}</p>
						</div>
						<hr />
						<div className="cartitems-total-item">
							<p>Shipping Fee</p>
							<p>Free</p>
						</div>
						<hr />
						<div className="cartitems-total-item">
							<h3>Total</h3>
							<h3>${getTotalCartAmount()}</h3>
						</div>
					</div>
					<button>PROCEED TO CHECKOUT</button>
				</div>
				<div className="cartitems-promocode">
					<p>If you have a promo code, Enter it here</p>
					<div className="cartitems-promobox">
						<input type="text" placeholder="promo code" />
						<button>Submit</button>
					</div>
				</div>
			</div>



		</div>
	)
}


export default CartItems
