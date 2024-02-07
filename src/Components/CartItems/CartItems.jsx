import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
	const {all_product, cartItems, addToCart, removeFromCart, removeItemFromCart, getTotalCartAmount} = useContext(ShopContext);
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

		{all_product.map((e)=> {
			if(cartItems[e.id] > 0 ) {
				return (
					<div>
					<div className="cartitems-format cartitems-format-main">
						<img src={e.image} alt="" className="cartitems-product-icon" />
						<div className="item-right">

							<p className="item-name">{e.name}</p>
							<p className="item-remove" onClick={() => { removeItemFromCart(e.id) }}>Remove</p>
							<p className="item-price center">${e.new_price}</p>
							<div className="cartitems-quantity-container">
								<button onClick={() => { removeFromCart(e.id)}} className="cartitems-quantity-change">➖</button>
								<button className="cartitems-quantity">{cartItems[e.id]}</button>
								<button onClick={() => { addToCart(e.id)}} className="cartitems-quantity-change">➕</button>
							</div>
							<p className="item-total center">${e.new_price * cartItems[e.id]}</p>
							<img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeItemFromCart(e.id) }} alt="" />

						</div>
					</div>
					<hr />
				</div>
				)
			}
			return null;
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