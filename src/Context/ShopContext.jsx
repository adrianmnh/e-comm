import React, { createContext, useState, useEffect } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	// for (let i = 0; i < all_product.length; i++) {
	for (let i = 0; i < 30+1; i++) {
		cart[i] = 0;
	}
	return cart;
}

const ShopContextProvider = (props) => {

	const apiUrl = process.env.REACT_APP_API_ENDPOINT;

	const [allProduct, setAllProduct] = useState([]);
	const [prods, setProds] = useState([]);
	const [cartItems, setCartItems] = useState(getDefaultCart());

	useEffect(() => {
		fetch(`${apiUrl}/all_product`)
		.then( res => {
			if (!res.ok) {
				if (res.state >= 500){
					throw new Error('Server Error');
				}
				else {
					throw new Error('Unknown Error');
				}
			}
			return res.json();
		}).then( data => {
			setAllProduct(data.all_product)
			return data.all_product;

			// further processing of data
		}).then( (all_product) => {

			setProds(all_product.map( (product) => ({
				id: product.id,
				name: product.name,
				category: product.category
			})));

		}).catch( error => {
			console.log(error);
		})
	}, [])

	useEffect(() => {
		console.log(prods)
		prods.length === 0 ? console.log('No products found') : console.log('Products found');
	}, [prods])



	const addToCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
		console.log(cartItems)
	}

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId] : prev[itemId] -1}))
	}

	const removeItemFromCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId]: 0}))
	}

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems){
			if (cartItems[item] > 0) {
				let itemInfo = allProduct.find((product) => product.id === Number(item));
				// At this point, itemInfo is defined, so its properties can be safely accessed
				totalAmount += itemInfo.new_price * cartItems[item];
			}
		}
		return totalAmount;
	}

	const getTotalCartItems = () => {
		let totalItems = 0;
		for (const item in cartItems){
			if (cartItems[item] > 0) {
				totalItems += cartItems[item];
			}
		}
		return totalItems;
	}

	const contextValue = {allProduct, cartItems, apiUrl, addToCart, removeFromCart, removeItemFromCart, getTotalCartAmount, getTotalCartItems};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>

	)
}

export default ShopContextProvider;